/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, MapPin, Mail, Users, FileText, Flame, Map as MapIcon, TrendingDown, Wind, Home, X, Phone, Globe } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// Fix for default leaflet icon issue in React
const icon = L.divIcon({
  className: "custom-icon",
  html: `<div class="bg-red-600 w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>`,
});

const locations = [
  { id: 1, name: "Rumpke Landfill Site", position: [37.931, -83.945], description: "30 Larison Rd, Jeffersonville, KY 40337. The epicenter of the environmental crisis." },
];

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <header className="bg-red-600 text-black py-20 px-6 text-center border-b-4 border-yellow-400">
        <motion.h1 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl font-black mb-4 uppercase tracking-tighter"
        >
          Stop the Rumpke Expansion
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold max-w-2xl mx-auto uppercase"
        >
          Montgomery County is NOT a dumping ground!
        </motion.p>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6">
        {/* The Problem Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 flex items-center gap-3 uppercase text-yellow-400">
            <Flame className="text-red-500" size={40} /> The Current Reality
          </h2>
          <div className="bg-stone-900 p-8 rounded-none border-l-8 border-red-600 shadow-2xl">
            <img
              src="/rumpke.png"
              alt="Rumpke Landfill site"
              className="w-full h-64 object-cover mb-6 border-4 border-white"
              referrerPolicy="no-referrer"
            />
            <p className="text-xl leading-relaxed mb-4 font-bold">
              Residents of Montgomery County are already suffering from the failures of the existing Rumpke landfill operations. 
              Despite promises of odor control, the stench frequently permeates our neighborhoods, affecting our quality of life, 
              property values, and health.
            </p>
            <p className="text-xl leading-relaxed font-bold text-red-400">
              Rumpke has failed to adequately manage the current site. Expanding it now is not just irresponsible—it is a direct 
              disregard for the well-being of our community.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-center uppercase text-yellow-400">A History of Broken Promises</h2>
          <div className="space-y-6">
            {[
              { year: "2021", event: "Rumpke promises state-of-the-art odor control technology." },
              { year: "2023", event: "Major regulatory violation issued for leachate management failures." },
              { year: "2024", event: "Community petition with 2,000 signatures ignored by county officials." },
              { year: "2025", event: "Expansion proposal announced despite ongoing, unresolved odor complaints." },
            ].map((item, index) => (
              <motion.a 
                key={index} 
                href="#"
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex gap-4 items-start bg-stone-800 p-4 border-2 border-yellow-400 hover:bg-red-900 transition cursor-pointer"
              >
                <div className="font-black text-black bg-yellow-400 px-3 py-1 rounded-none">{item.year}</div>
                <div className="text-xl font-bold">{item.event}</div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 flex items-center gap-3 uppercase text-yellow-400">
            <MapIcon className="text-red-500" size={40} /> Affected Areas Map
          </h2>
          <div className="h-[600px] w-full border-4 border-red-600 rounded-none overflow-hidden">
            <MapContainer center={[37.931, -83.945]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Circle 
                center={[37.931, -83.945]}
                radius={12070} // 7.5 miles in meters (15-mile diameter)
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
              />
              {locations.map((loc) => (
                <Marker key={loc.id} position={loc.position as [number, number]} icon={icon}>
                  <Popup>
                    <div className="text-black font-bold">
                      <h3 className="text-lg font-black uppercase mb-1">{loc.name}</h3>
                      <p>{loc.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <p className="mt-4 text-stone-400 italic font-bold">The red circle represents the 15-mile diameter zone directly impacted by Rumpke's operations at 30 Larison Rd.</p>
        </section>

        {/* Community Devastation Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 flex items-center gap-3 uppercase text-red-600">
            <AlertTriangle className="text-yellow-400" size={40} /> The Devastation of Our Community
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-stone-900 p-8 border-t-4 border-red-600 shadow-2xl"
            >
              <TrendingDown className="text-red-500 mb-4" size={48} />
              <h3 className="text-2xl font-black mb-4 uppercase text-yellow-400">Plummeting Property Values</h3>
              <p className="text-lg leading-relaxed font-bold">
                Homeowners in the south of the county are watching their life savings evaporate. 
                Who wants to buy a home where you can't even open your windows? 
                The Rumpke expansion is a death sentence for our local real estate market.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-stone-900 p-8 border-t-4 border-red-600 shadow-2xl"
            >
              <Wind className="text-red-500 mb-4" size={48} />
              <h3 className="text-2xl font-black mb-4 uppercase text-yellow-400">Uninhabitable Stench</h3>
              <p className="text-lg leading-relaxed font-bold">
                The entire southern region of Montgomery County is becoming uninhabitable. 
                The persistent, nauseating stench of rotting waste and industrial chemicals 
                traps residents inside their own homes, stealing their right to fresh air.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-stone-900 p-8 border-t-4 border-red-600 shadow-2xl"
            >
              <AlertTriangle className="text-red-500 mb-4" size={48} />
              <h3 className="text-2xl font-black mb-4 uppercase text-yellow-400">Soil & Health Fears</h3>
              <p className="text-lg leading-relaxed font-bold">
                Whether the fears are founded or not, the community is terrified of the long-term 
                detriment to our soil. The potential for leachate leaks and chemical runoff 
                threatens to poison the very ground our children play on and our farmers rely on.
              </p>
            </motion.div>
          </div>
          <div className="mt-8 bg-red-900/30 p-6 border-2 border-red-600 italic text-center">
            <p className="text-xl font-black uppercase text-red-500">
              "We are being forced out of our homes by a corporation that prioritizes profit over people."
            </p>
          </div>
        </section>

        {/* Why Oppose Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-stone-900 p-6 border-4 border-red-600">
            <MapPin className="text-red-500 mb-4" size={48} />
            <h3 className="text-3xl font-black mb-3 uppercase">Environmental Impact</h3>
            <p className="text-lg">An expansion threatens our local ecosystem, water quality, and the rural character of Montgomery County.</p>
          </div>
          <div className="bg-stone-900 p-6 border-4 border-red-600">
            <Users className="text-red-500 mb-4" size={48} />
            <h3 className="text-3xl font-black mb-3 uppercase">Community Health</h3>
            <p className="text-lg">Increased traffic, noise, and persistent odors pose significant risks to the health and safety of our residents.</p>
          </div>
        </section>

        {/* Take Action Section */}
        <section className="bg-yellow-400 p-10 text-black">
          <h2 className="text-4xl font-black mb-8 text-center uppercase">Take Action Now</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-none font-black text-lg uppercase transition cursor-pointer"
            >
              <Mail size={24} /> Contact Officials
            </motion.button>
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-none font-black text-lg uppercase transition">
              <FileText size={24} /> Sign the Petition
            </motion.a>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-stone-900 border-4 border-red-600 w-full max-w-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X size={32} />
              </button>

              <div className="p-8">
                <h2 className="text-4xl font-black uppercase text-yellow-400 mb-8 border-b-4 border-red-600 pb-4">
                  Contact Your Representatives
                </h2>
                
                <div className="space-y-10">
                  {/* Governor Section */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase text-red-500 flex items-center gap-2">
                      <Users size={28} /> Governor Andy Beshear
                    </h3>
                    <div className="space-y-2 text-lg font-bold">
                      <p className="flex items-center gap-3"><Phone size={20} className="text-yellow-400" /> (502) 564-2611</p>
                      <p className="flex items-center gap-3"><Globe size={20} className="text-yellow-400" /> governor.ky.gov</p>
                      <p className="text-stone-400 italic mt-2">Demand that he intervene to protect Montgomery County from environmental devastation.</p>
                    </div>
                  </div>

                  {/* Senator Section */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase text-red-500 flex items-center gap-2">
                      <Users size={28} /> State Senator Stephen West
                    </h3>
                    <div className="space-y-2 text-lg font-bold">
                      <p className="flex items-center gap-3"><Phone size={20} className="text-yellow-400" /> (502) 564-8100</p>
                      <p className="flex items-center gap-3"><Mail size={20} className="text-yellow-400" /> steve.west@lrc.ky.gov</p>
                      <p className="text-stone-400 italic mt-2">Tell him his constituents in Jeffersonville are suffering and we will not be ignored.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="mt-10 w-full bg-red-600 text-white py-4 font-black uppercase text-xl hover:bg-red-700 transition cursor-pointer"
                >
                  Close Instructions
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-8 text-stone-500 border-t border-stone-700 bg-black">
        &copy; 2026 Citizens for a Clean Montgomery County. FIGHT BACK!
      </footer>
    </div>
  );
}
