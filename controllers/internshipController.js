import Internship from "../models/Internship.js";

// 🟢 1. Create Internship
export const createInternship = async (req, res) => {
  try {
    const {
      companyName,
      role,
      status,
      appliedDate,
      reminderDate,
      notes,
      jobLink,
    } = req.body;

    const internship = await Internship.create({
      userId: req.user.id, // from JWT middleware
      companyName,
      role,
      status,
      appliedDate,
      reminderDate,
      notes,
      jobLink,
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 2. Get All Internships (for logged user)
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 3. Get Single Internship
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship || internship.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 4. Update Internship
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship || internship.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedInternship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 5. Delete Internship
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship || internship.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Internship not found" });
    }

    await internship.deleteOne();

    res.json({ message: "Internship deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 6. Dashboard Stats (IMPORTANT 🔥)
export const getDashboardStats = async (req, res) => {
  try {
    const internships = await Internship.find({ userId: req.user.id });

    const total = internships.length;

    const applied = internships.filter(i => i.status === "Applied").length;
    const interview = internships.filter(i => i.status === "Interview").length;
    const rejected = internships.filter(i => i.status === "Rejected").length;
    const offer = internships.filter(i => i.status === "Offer").length;

    const successRate = total > 0 ? ((offer / total) * 100).toFixed(2) : 0;

    res.json({
      total,
      applied,
      interview,
      rejected,
      offer,
      successRate,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};