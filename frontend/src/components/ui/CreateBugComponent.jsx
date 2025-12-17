import React, { useState } from "react";
import axios from "axios";
import severityLevels from "../../utils/SeverityLevels";
import progressStages from "../../utils/ProgressLevels";
import { toast } from "react-toastify";

const CreateBugComponent = ({isCreated}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
    progress: "Not Started",  
    reporterName: "",
    estimatedFixTimeHours: "",
  });

  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, severity, progress, reporterName, estimatedFixTimeHours } =
      formData;

    if (
      !title ||
      !severity ||
      !progress ||
      !reporterName ||
      !estimatedFixTimeHours
    ) {
      toast.warn("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/create-bug`, {
        ...formData,
        estimatedFixTimeHours: Number(estimatedFixTimeHours),
      });

      if (!response.data?.success) {
        toast.error("Failed to create bug");
        return;
      }

      toast.success("Bug created successfully");

      setFormData({
        title: "",
        description: "",
        severity: "",
        progress: "Not Started",
        reporterName: "",
        estimatedFixTimeHours: "",
      });
      isCreated();
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Bug Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bug Title <span className="text-red-600">*</span>
        </label>
        <input
          name="title"
          minLength={5}
          value={formData.title}
          onChange={handleChange}
          placeholder="Short descriptive bug title"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional detailed description"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Severity & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity <span className="text-red-600">*</span>
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select severity</option>
            {severityLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Progress <span className="text-red-600">*</span>
          </label>
          <select
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            {progressStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reporter & Estimate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reporter Name <span className="text-red-600">*</span>
          </label>
          <input
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Fix Time (hours) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="estimatedFixTimeHours"
            min={0}
            value={formData.estimatedFixTimeHours}
            onChange={handleChange}
            placeholder="e.g. 4"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-5 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-500 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Bug"}
        </button>
      </div>
    </form>
  );
};

export default CreateBugComponent;
