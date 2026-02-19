import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Camera, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { IssueType, issueTypeLabels, issueTypeIcons } from '../mockData';
import { motion } from 'motion/react';

export function Capture() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [issueType, setIssueType] = useState<IssueType | ''>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (capturedImage && issueType) {
      navigate('/preview', { state: { image: capturedImage, type: issueType } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
        <button onClick={() => navigate('/home')} className="text-white/80 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-white font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Capture Issue
        </h1>
        <div className="w-6" />
      </div>

      {/* Camera Preview / Captured Image */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        {capturedImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full"
          >
            <img src={capturedImage} alt="Captured issue" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl"
              />
              <Camera className="w-24 h-24 text-slate-600 mx-auto mb-4 relative z-10" />
            </div>
            <p className="text-slate-400 font-medium">Tap to capture issue</p>
            <p className="text-slate-600 text-sm mt-2">Take a clear photo of the problem</p>
          </motion.div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-t from-slate-900 to-slate-800 p-6 space-y-4 border-t border-slate-700">
        {capturedImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="issue-type" className="text-white font-semibold">Issue Type</Label>
              <Select value={issueType} onValueChange={(value) => setIssueType(value as IssueType)}>
                <SelectTrigger 
                  id="issue-type" 
                  className="bg-slate-800 border-slate-600 text-white h-12 rounded-xl focus:border-cyan-400 focus:ring-cyan-400/20"
                >
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {(Object.keys(issueTypeLabels) as IssueType[]).map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="text-white focus:bg-slate-700 focus:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span>{issueTypeIcons[type]}</span>
                        {issueTypeLabels[type]}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 h-12 rounded-xl"
                onClick={() => setCapturedImage(null)}
              >
                Retake
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 h-12 rounded-xl shadow-lg shadow-cyan-500/30"
                onClick={handleContinue}
                disabled={!issueType}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        ) : (
          <Button 
            onClick={handleCapture}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-7 rounded-2xl shadow-lg shadow-cyan-500/30"
          >
            <ImageIcon className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">Take Photo</span>
          </Button>
        )}
      </div>
    </div>
  );
}
