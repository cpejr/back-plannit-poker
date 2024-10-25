import RoomModel from "../Models/RoomModel.js";
import UserModel from "../Models/UserModel.js";
import generateRoomCode from "../Utils/generateRoomCode.js";

class RoomController {
  async create(req, res) {
    try {
      const code = await generateRoomCode();
      const room = new RoomModel({
        ...req.body,
        code,
        expiresAt: new Date(Date.now() + 3600 * 60 * 24),
      });
      await room.save();
      res.status(201).json(room);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error creating room", details: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const rooms = await RoomModel.find().populate("users");
      res.status(200).json(rooms);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error fetching rooms", details: err.message });
    }
  }

  async get(req, res) {
    try {
      const room = await RoomModel.findOne({ code: req.params.id }).populate(
        "users"
      );
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.status(200).json(room);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error fetching room", details: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const room = await RoomModel.findByIdAndDelete(req.params.id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      await UserModel.deleteMany({ _id: { $in: room.users } });

      res
        .status(200)
        .json({ message: "Room and associated users deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error deleting room", details: err.message });
    }
  }

  async update(req, res) {
    try {
      const room = await RoomModel.findOneAndUpdate(
        { code: req.params.id },
        req.body,
        { new: true }
      );
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.status(200).json(room);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error updating room", details: err.message });
    }
  }

  async addUser(req, res) {
    const { users } = req.body;
    const roomId = req.params.id;

    try {
      const room = await RoomModel.findOne({ code: roomId });
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const usersToAdd = [];
      for (const userId of users) {
        const user = await UserModel.findById(userId);
        if (!user) {
          return res
            .status(404)
            .json({ error: `User with ID ${userId} not found` });
        }
        if (!room.users.includes(userId)) {
          usersToAdd.push(userId);
        }
      }

      if (usersToAdd.length > 0) {
        room.users.push(...usersToAdd);
        await room.save();
      }

      res.status(200).json(room);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error adding users to room", details: err.message });
    }
  }
}

export default new RoomController();
