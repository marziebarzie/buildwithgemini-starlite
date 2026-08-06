import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, PlusCircle, User, Tag, ShieldAlert, Wifi, Thermometer, Mountain, Car, Check } from 'lucide-react';

export default function CommunityNotes({ selectedLocation, locations }) {
  const currentLocation = selectedLocation || locations[0];
  const [fieldNotes, setFieldNotes] = useState(currentLocation.fieldNotes || []);
  const [newComment, setNewComment] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [selectedTag, setSelectedTag] = useState('Headlights');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const availableTags = ['Headlights', 'Parking', 'Cell Signal', 'Elevation', 'Health/Safety', 'Weather', 'Naked Eye vs Camera'];

  const handleUpvote = (id) => {
    setFieldNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, upvotes: note.upvotes + 1 } : note
      )
    );
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newUsername.trim()) return;

    const newNote = {
      id: `fn-${Date.now()}`,
      user: newUsername,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      upvotes: 1,
      tags: [selectedTag],
      comment: newComment
    };

    setFieldNotes([newNote, ...fieldNotes]);
    setNewComment('');
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* HEADER & LOCATION INDICATOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" /> Community Field Intel & Spot Notes
          </h2>
          <p className="text-xs text-slate-400">Community Field Advice for <strong className="text-indigo-300">{currentLocation.name}</strong></p>
        </div>

        <button
          onClick={() => setIsAddingNote(!isAddingNote)}
          className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow flex items-center gap-1.5 transition"
        >
          <PlusCircle className="w-4 h-4" /> {isAddingNote ? 'Cancel' : 'Post Field Note'}
        </button>
      </div>

      {/* ADD NEW NOTE FORM */}
      {isAddingNote && (
        <form onSubmit={handleAddNote} className="glass-card p-4 border-indigo-500/50 space-y-3 animate-in fade-in duration-200">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Post Spot Intel & Advice</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Your Username</label>
              <input
                type="text"
                placeholder="e.g. AstroAura_99"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Tag Category</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Field Advice / Warning</label>
            <textarea
              rows="3"
              placeholder="e.g. Walk 800m down past the parking lot to avoid car headlights. Dew heater required after midnight!"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Submit Community Note
          </button>
        </form>
      )}

      {/* QUICK SPOT SUMMARY BADGES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="line-clamp-1">
            <span className="text-[10px] text-slate-400 block font-semibold">Signal</span>
            <span className="text-slate-200 text-[11px]">{currentLocation.cellSignal}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Mountain className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Elevation</span>
            <span className="text-slate-200 text-[11px]">{currentLocation.elevation}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="line-clamp-1">
            <span className="text-[10px] text-slate-400 block font-semibold">Temps</span>
            <span className="text-slate-200 text-[11px]">{currentLocation.seasonalTemps}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="line-clamp-1">
            <span className="text-[10px] text-slate-400 block font-semibold">Health</span>
            <span className="text-slate-200 text-[11px]">{currentLocation.healthConsiderations}</span>
          </div>
        </div>
      </div>

      {/* NOTES LIST */}
      <div className="space-y-3">
        {fieldNotes.map((note) => (
          <div key={note.id} className="glass-card p-4 space-y-2 border-slate-800 hover:border-slate-700 transition">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 text-xs font-bold">
                  {note.user.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{note.user}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{note.timestamp}</span>
                </div>
              </div>

              {/* TAG BADGES */}
              <div className="flex gap-1">
                {note.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans pl-9">
              "{note.comment}"
            </p>

            {/* UPVOTE ACTION */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleUpvote(note.id)}
                className="text-xs text-slate-400 hover:text-emerald-400 bg-slate-950/60 hover:bg-slate-900 py-1 px-2.5 rounded-lg border border-slate-800 flex items-center gap-1.5 transition font-mono"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({note.upvotes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
