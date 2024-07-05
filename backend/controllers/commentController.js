import { Comment } from "../models/comment.js";

export async function getCommentsByLecture(req, res) {
  try {
    const comments = await Comment.find({
      lectureId: req.params.lectureId,
    })
      .populate({
        path: "user",
        select: "username email",
      })
      .sort({
        lastUpdate: 1,
      });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function setComment(req, res) {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      user: req.body.userId,
      lectureId: req.body.lectureId,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error setting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
