import { buildFeedbackPath, extractFeedback } from "./index";

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  const selectedData = data.find((feedback) => feedback.id === feedbackId);
  res.status(200).json({ feedback: selectedData });
}
