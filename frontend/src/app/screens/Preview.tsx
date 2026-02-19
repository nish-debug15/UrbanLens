import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, MapPin, Sparkles, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { SeverityBadge } from '../components/SeverityBadge';
import { IssueSeverity, IssueType, issueTypeLabels, issueTypeIcons } from '../mockData';
import { motion } from 'motion/react';

export function Preview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, type } = location.state as { image: string; type: IssueType };
  
  const [severity, setSeverity] = useState<IssueSeverity>('medium');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    navigate('/home');
  };

  const severityOptions: IssueSeverity[] = ['low', 'medium', 'high'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 p-4 flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-3 text-slate-700 hover:text-slate-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          Issue Preview
        </h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-28">
        {/* Image Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/50"
        >
          <div className="relative">
            <img src={image} alt="Issue preview" className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </motion.div>

        {/* Auto-filled Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <Label className="text-slate-700 font-semibold mb-3 block">Issue Type</Label>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-2xl">{issueTypeIcons[type]}</span>
            <span className="text-slate-900 font-semibold">{issueTypeLabels[type]}</span>
          </div>
        </motion.div>

        {/* Severity Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <Label className="text-slate-700 font-semibold mb-3 block">Severity Level</Label>
          <div className="flex gap-3">
            {severityOptions.map((level) => (
              <motion.button
                key={level}
                onClick={() => setSeverity(level)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-4 rounded-xl border-2 transition-all ${
                  severity === level 
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-500/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <SeverityBadge severity={level} className="mx-auto" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <Label htmlFor="description" className="text-slate-700 font-semibold mb-3 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Provide additional details about the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none rounded-xl border-slate-200 bg-white focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </motion.div>

        {/* Location (Auto-detected) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-5 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <Label className="text-white/90 mb-2 block text-sm">Auto-detected Location</Label>
              <p className="font-semibold">Koramangala, Bangalore</p>
              <p className="text-xs text-white/80 mt-1">5th Block, Koramangala Ward</p>
              <p className="text-xs text-white/70 mt-1">GPS: 12.9716° N, 77.5946° E</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submit Button (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Button 
          onClick={handleSubmit}
          className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-2xl shadow-lg shadow-cyan-500/30 font-semibold text-lg"
          disabled={!description}
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Report
        </Button>
      </div>
    </div>
  );
}
