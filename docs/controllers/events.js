"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createNewEvent = exports.getEvents = void 0;
const helpers_1 = require("../helpers");
const Event_1 = __importDefault(require("../models/event/Event"));
const People_1 = __importDefault(require("../models/user/People"));
const User_1 = __importDefault(require("../models/user/User"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.default.find({ user: (0, helpers_1.stringToObjectId)(req.uid), status: true });
    const eventsWithNameAndId = events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findById(event.user);
        if (!user)
            return;
        const people = yield People_1.default.findById(user.people);
        if (!people)
            return;
        return {
            _id: event._id,
            title: event.title,
            start: event.start,
            end: event.end,
            note: event.note,
            bgColor: event.bgColor,
            user: {
                _id: user._id,
                name: people.name + ' ' + people.lastName
            }
        };
    }));
    res.json({
        ok: true,
        events: yield Promise.all(eventsWithNameAndId),
    });
});
exports.getEvents = getEvents;
const createNewEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, note, start, end, bgColor } = req.body;
    const event = new Event_1.default({ title, note, start, end, bgColor });
    try {
        event.user = (0, helpers_1.stringToObjectId)(req.uid);
        yield event.save();
        res.json({
            ok: true,
            msg: 'Created new event',
            event
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.createNewEvent = createNewEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield Event_1.default.findById(id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });
        }
        const newEvent = Object.assign(Object.assign({}, req.body), { user: req.uid });
        const updatedEvent = yield Event_1.default.findByIdAndUpdate(id, newEvent, { new: true });
        res.json({
            ok: true,
            msg: 'Updated event',
            event: updatedEvent
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield Event_1.default.findById(id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to delete this event'
            });
        }
        // await Event.findByIdAndDelete( id );
        event.status = false;
        yield Event_1.default.findByIdAndUpdate(id, event, { new: true });
        res.json({
            ok: true,
            msg: 'Deleted Event successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=events.js.map