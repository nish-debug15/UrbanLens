import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { SlidersHorizontal, Navigation, X, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { mockIssues, IssueType, IssueStatus, issueTypeLabels } from '../mockData';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons based on severity
const createCustomIcon = (severity: 'low' | 'medium' | 'high') => {
  const colors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444'
  };

  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="${colors[severity]}"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
      <circle cx="16" cy="16" r="4" fill="${colors[severity]}"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
};

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

export function MapView() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [typeFilters, setTypeFilters] = useState<IssueType[]>([]);
  const [statusFilters, setStatusFilters] = useState<IssueStatus[]>([]);
  const [mapCenter] = useState<[number, number]>([12.9716, 77.5946]); // Bengaluru

  const selectedIssueData = mockIssues.find(issue => issue.id === selectedIssue);

  const filteredIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      const typeMatch = typeFilters.length === 0 || typeFilters.includes(issue.type);
      const statusMatch = statusFilters.length === 0 || statusFilters.includes(issue.status);
      return typeMatch && statusMatch;
    });
  }, [typeFilters, statusFilters]);

  const toggleTypeFilter = (type: IssueType) => {
    setTypeFilters(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleStatusFilter = (status: IssueStatus) => {
    setStatusFilters(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const issueTypes: IssueType[] = ['pothole', 'streetlight', 'garbage', 'drainage', 'traffic', 'sidewalk'];
  const statuses: IssueStatus[] = ['pending', 'in-progress', 'resolved'];

  return (
    <div className="h-screen bg-slate-100 relative">
      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        zoomControl={false}
        className="h-full w-full"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterMap center={mapCenter} />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
        >
          {filteredIssues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.location.lat, issue.location.lng]}
              icon={createCustomIcon(issue.severity)}
              eventHandlers={{
                click: () => setSelectedIssue(issue.id),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{issueTypeLabels[issue.type]}</h3>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{issue.description}</p>
                  <p className="text-xs text-slate-500 mb-2">{issue.location.address}</p>
                  {issue.location.ward && (
                    <p className="text-xs text-cyan-600 font-medium">{issue.location.ward}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex gap-2 z-[1000]">
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          className={`bg-white/90 backdrop-blur-xl hover:bg-white shadow-lg border border-slate-200 text-slate-700 rounded-2xl ${showFilters ? 'ring-2 ring-cyan-500' : ''}`}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
        
        <Button 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`bg-white/90 backdrop-blur-xl hover:bg-white shadow-lg border border-slate-200 text-slate-700 rounded-2xl ${showHeatmap ? 'ring-2 ring-cyan-500' : ''}`}
        >
          <Layers className="w-4 h-4 mr-2" />
          Heatmap
        </Button>
        
        <div className="flex-1" />
        
        <Button 
          className="bg-white/90 backdrop-blur-xl hover:bg-white shadow-lg border border-slate-200 text-slate-700 rounded-2xl p-3"
        >
          <Navigation className="w-5 h-5" />
        </Button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 z-[1000] border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Issue Type</h4>
                <div className="flex flex-wrap gap-2">
                  {issueTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        typeFilters.includes(type)
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {issueTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => toggleStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        statusFilters.includes(status)
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => {
                    setTypeFilters([]);
                    setStatusFilters([]);
                  }}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl"
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heatmap Overlay Indicator */}
      <AnimatePresence>
        {showHeatmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-yellow-500/10 to-green-500/10 pointer-events-none z-[900]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-slate-700">
              Heatmap Mode Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Issue Card */}
      <AnimatePresence>
        {selectedIssueData && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 z-[1000] border border-slate-200"
          >
            <button
              onClick={() => setSelectedIssue(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start justify-between mb-3 pr-8">
              <h3 className="font-bold text-slate-900 text-lg">
                {issueTypeLabels[selectedIssueData.type]}
              </h3>
              <SeverityBadge severity={selectedIssueData.severity} />
            </div>
            
            <p className="text-sm text-slate-600 mb-3">{selectedIssueData.description}</p>
            
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-slate-700">Address:</span>
                {selectedIssueData.location.address}
              </p>
              {selectedIssueData.location.ward && (
                <p className="text-xs text-cyan-600 font-medium bg-cyan-50 px-2 py-1 rounded-lg inline-block">
                  {selectedIssueData.location.ward}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status={selectedIssueData.status} />
              <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg">
                View Details
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Badge */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg z-[900] border border-slate-200">
        <p className="text-xs font-semibold text-slate-700">
          Showing <span className="text-cyan-600">{filteredIssues.length}</span> of {mockIssues.length} issues
        </p>
      </div>
    </div>
  );
}
