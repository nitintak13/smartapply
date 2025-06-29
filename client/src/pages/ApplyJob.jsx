import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

export default function ApplyJob() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [cooldownExpiry, setCooldownExpiry] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    backendUrl,
    userData,
    jobs,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
        if (data.success) setJobData(data.job);
        else toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (jobData && Array.isArray(userApplications)) {
      setIsAlreadyApplied(
        userApplications.some((app) => app?.jobId?._id === jobData._id)
      );
    }
  }, [jobData, userApplications]);

  const applyHandler = async () => {
    if (!userData) return toast.error("Please log in to apply");
    if (!userData.resume) {
      toast.error("Upload your resume first");
      return navigate("/applications");
    }

    setSubmitting(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success || data.rateLimited) {
        if (data.retryAfter) {
          const retry = new Date(data.retryAfter);
          toast.error(
            `Retry after ${retry.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          );
        } else {
          toast.error(data.message || "Application error");
        }
        return;
      }

      const adviceText =
        data.advice?.split("Suggestions:")[1]?.trim() || data.advice;

      setFeedback({
        matchScore: data.matchScore,
        advice: adviceText,
        blocked: data.blocked,
      });

      if (data.cooldownExpiry) {
        setCooldownExpiry(new Date(data.cooldownExpiry));
      }

      fetchUserApplications();

      data.blocked
        ? toast.warn("Low fit score. Improve your resume and try later.")
        : toast.success(" Application submitted!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !jobData) return <Loading />;

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Job Header */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={jobData.companyId?.image || "/default-logo.png"}
                alt={jobData.companyId?.name}
                className="h-16 w-16 rounded border object-contain"
              />
              <div>
                <h1 className="text-2xl font-semibold">{jobData.title}</h1>
                <p className="text-gray-600 mt-1 text-sm">
                  {jobData.companyId?.name} • {jobData.location} •{" "}
                  {jobData.level}
                </p>
              </div>
            </div>

            <button
              onClick={applyHandler}
              disabled={isAlreadyApplied || submitting}
              className={`px-6 py-2 rounded text-sm transition ${
                isAlreadyApplied
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {submitting
                ? "Checking..."
                : isAlreadyApplied
                ? "Already Applied"
                : "Apply Now"}
            </button>
          </div>

          {/* Feedback Box */}
          {feedback && (
            <div
              className={`mt-6 p-4 rounded text-sm border ${
                feedback.blocked
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              <p className="font-semibold">
                Fit Score: {feedback.matchScore}/100{" "}
                {feedback.blocked ? "(Too Low)" : "(Good Match)"}
              </p>
              <p className="mt-2 whitespace-pre-wrap">{feedback.advice}</p>
              {cooldownExpiry && (
                <p className="mt-2 text-sm text-red-600">
                  Retry after{" "}
                  <strong>
                    {cooldownExpiry.toLocaleDateString()} at{" "}
                    {cooldownExpiry.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: jobData.description }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            More jobs from {jobData.companyId?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs
              .filter(
                (j) =>
                  j._id !== jobData._id &&
                  j.companyId?._id === jobData.companyId?._id
              )
              .slice(0, 4)
              .map((j) => (
                <JobCard key={j._id} job={j} />
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
