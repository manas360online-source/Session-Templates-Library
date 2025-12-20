import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

export const CognitiveRestructuring: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    situation: '',
    thoughts: '',
    emotions: { anxiety: '', sadness: '', anger: '', shame: '', other: '', otherName: '' },
    evidenceFor: '',
    evidenceAgainst: '',
    distortions: [] as string[],
    alternativeThought: '',
    emotionsAfter: { anxiety: '', sadness: '', anger: '', shame: '', other: '' }
  });

  const nextStep = () => {
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(s => s - 1);
    window.scrollTo(0, 0);
  };

  const handleEmotionChange = (type: string, value: string, isAfter: boolean = false) => {
    const key = isAfter ? 'emotionsAfter' : 'emotions';
    setData(prev => ({
        ...prev,
        [key]: { ...prev[key as 'emotions' | 'emotionsAfter'], [type]: value }
    }));
  };

  const handleDistortionToggle = (distortion: string) => {
    setData(prev => {
      const exists = prev.distortions.includes(distortion);
      return {
        ...prev,
        distortions: exists 
          ? prev.distortions.filter(d => d !== distortion)
          : [...prev.distortions, distortion]
      };
    });
  };

  const distortionsList = [
      { id: 'all-or-nothing', label: 'All-or-Nothing Thinking', desc: 'Seeing things in black-and-white categories' },
      { id: 'overgeneralization', label: 'Overgeneralization', desc: 'Seeing a single negative event as a never-ending pattern' },
      { id: 'mental-filter', label: 'Mental Filter', desc: 'Focusing only on negative details' },
      { id: 'discounting', label: 'Discounting the Positive', desc: 'Insisting positive experiences "don\'t count"' },
      { id: 'jumping', label: 'Jumping to Conclusions', desc: 'Making negative interpretations without facts' },
      { id: 'catastrophizing', label: 'Catastrophizing', desc: 'Expecting disaster' },
      { id: 'emotional', label: 'Emotional Reasoning', desc: '"I feel it, therefore it must be true"' },
      { id: 'shoulds', label: 'Should Statements', desc: 'Using "should," "must," or "ought"' },
      { id: 'labeling', label: 'Labeling', desc: 'Attaching a negative label to yourself or others' },
      { id: 'personalization', label: 'Personalization', desc: 'Blaming yourself for something you weren\'t responsible for' }
  ];

  const progress = Math.min(((step) / 8) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">🧠 Cognitive Restructuring</h1>
        <p className="opacity-90 text-lg">Challenge and change negative thought patterns</p>
      </div>

      {/* Session Info */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase font-semibold">Duration</div>
          <div className="text-indigo-600 font-bold">45-60 min</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase font-semibold">Difficulty</div>
          <div className="text-indigo-600 font-bold">Moderate</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase font-semibold">Focus</div>
          <div className="text-indigo-600 font-bold">Thoughts</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 w-full">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8">
        {/* Step 1: Identify Situation */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">1</span>
              <h2 className="text-2xl font-bold text-gray-800">Identify the Triggering Situation</h2>
            </div>
            <p className="text-gray-600 mb-6">Think of a recent situation where you felt distressed, anxious, or upset. Be specific about what happened, when, where, and who was involved.</p>
            
            <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6 shadow-sm">
              <span className="font-bold text-indigo-600 block mb-1">Example:</span>
              <p className="text-gray-700">"My boss criticized my presentation in front of the team during yesterday's meeting."</p>
            </div>

            <label className="block font-bold text-gray-700 mb-2">Your situation:</label>
            <textarea 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-colors min-h-[120px]"
              placeholder="Describe the situation in detail..."
              value={data.situation}
              onChange={e => setData({...data, situation: e.target.value})}
            />
            
            <div className="flex justify-end mt-8">
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Automatic Thoughts */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">2</span>
              <h2 className="text-2xl font-bold text-gray-800">Identify Automatic Thoughts</h2>
            </div>
            <p className="text-gray-600 mb-4">What thoughts went through your mind during or immediately after this situation? Write down everything that came to mind, even if it seems irrational.</p>
            
            <div className="bg-yellow-50 border-2 border-yellow-400/50 p-4 rounded-lg mb-6">
              <strong className="text-yellow-800">💡 Tip:</strong>
              <span className="text-yellow-900 ml-2">Automatic thoughts are often in "shorthand" - brief statements or images that flash through your mind.</span>
            </div>

            <label className="block font-bold text-gray-700 mb-2">Automatic thoughts:</label>
            <textarea 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-colors min-h-[120px]"
              placeholder="e.g., 'I'm terrible at my job', 'Everyone thinks I'm incompetent', 'I'm going to get fired'..."
              value={data.thoughts}
              onChange={e => setData({...data, thoughts: e.target.value})}
            />
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Emotions */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">3</span>
              <h2 className="text-2xl font-bold text-gray-800">Identify Emotions & Rate Intensity</h2>
            </div>
            <p className="text-gray-600 mb-6">What emotions did you feel? Rate the intensity of each emotion from 0 (not at all) to 10 (extremely intense).</p>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="p-4 font-semibold">Emotion</th>
                            <th className="p-4 font-semibold w-40">Intensity (0-10)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {['Anxiety', 'Sadness', 'Anger', 'Shame'].map((emotion) => (
                            <tr key={emotion} className="odd:bg-gray-50">
                                <td className="p-4 text-gray-700 font-medium">{emotion}</td>
                                <td className="p-4">
                                    <input 
                                        type="number" 
                                        min="0" max="10"
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="0-10"
                                        value={data.emotions[emotion.toLowerCase() as keyof typeof data.emotions] as string}
                                        onChange={(e) => handleEmotionChange(emotion.toLowerCase(), e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className="odd:bg-gray-50">
                            <td className="p-4">
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Other (specify)..."
                                    value={data.emotions.otherName}
                                    onChange={(e) => setData({...data, emotions: {...data.emotions, otherName: e.target.value}})}
                                />
                            </td>
                            <td className="p-4">
                                <input 
                                    type="number" 
                                    min="0" max="10"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="0-10"
                                    value={data.emotions.other}
                                    onChange={(e) => handleEmotionChange('other', e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Examine Evidence */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">4</span>
              <h2 className="text-2xl font-bold text-gray-800">Examine the Evidence</h2>
            </div>
            <p className="text-gray-600 mb-6">Now let's look at your automatic thoughts objectively. What evidence supports them? What evidence contradicts them?</p>
            
            <label className="block font-bold text-gray-700 mb-2">Evidence FOR your thought (facts only):</label>
            <textarea 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-colors min-h-[120px] mb-6"
              placeholder="List concrete facts that support your automatic thought..."
              value={data.evidenceFor}
              onChange={e => setData({...data, evidenceFor: e.target.value})}
            />

            <label className="block font-bold text-gray-700 mb-2">Evidence AGAINST your thought (facts only):</label>
            <textarea 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-colors min-h-[120px] mb-6"
              placeholder="List concrete facts that contradict your automatic thought..."
              value={data.evidenceAgainst}
              onChange={e => setData({...data, evidenceAgainst: e.target.value})}
            />

            <div className="bg-yellow-50 border-2 border-yellow-400/50 p-4 rounded-lg">
              <strong className="text-yellow-800">💡 Helpful Questions:</strong>
              <span className="text-yellow-900 ml-2">Has this happened before? What would I tell a friend in this situation? Am I confusing a thought with a fact?</span>
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Distortions */}
        {step === 5 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">5</span>
              <h2 className="text-2xl font-bold text-gray-800">Identify Cognitive Distortions</h2>
            </div>
            <p className="text-gray-600 mb-6">Which thinking traps (cognitive distortions) might you be falling into? Check all that apply:</p>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                {distortionsList.map((dist) => (
                    <label key={dist.id} className="flex items-start gap-3 mb-4 last:mb-0 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            className="mt-1.5 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                            checked={data.distortions.includes(dist.id)}
                            onChange={() => handleDistortionToggle(dist.id)}
                        />
                        <div>
                            <span className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{dist.label}:</span>
                            <span className="text-gray-600 ml-1">{dist.desc}</span>
                        </div>
                    </label>
                ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Alternative Thought */}
        {step === 6 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">6</span>
              <h2 className="text-2xl font-bold text-gray-800">Generate Alternative, Balanced Thoughts</h2>
            </div>
            <p className="text-gray-600 mb-6">Based on the evidence and recognizing your cognitive distortions, what would be a more balanced, realistic way of thinking about this situation?</p>
            
            <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6 shadow-sm">
              <span className="font-bold text-indigo-600 block mb-1">Instead of: "I'm terrible at my job"</span>
              <p className="text-gray-700">Try: "I made a mistake in this presentation, but I've successfully completed many projects. I can learn from this and improve."</p>
            </div>

            <label className="block font-bold text-gray-700 mb-2">Your alternative, balanced thought:</label>
            <textarea 
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-colors min-h-[120px] mb-6"
              placeholder="Write a more realistic, helpful way of thinking about this situation..."
              value={data.alternativeThought}
              onChange={e => setData({...data, alternativeThought: e.target.value})}
            />

            <div className="bg-yellow-50 border-2 border-yellow-400/50 p-4 rounded-lg">
              <strong className="text-yellow-800">💡 Key:</strong>
              <span className="text-yellow-900 ml-2">The alternative thought should be realistic (not just positive thinking), helpful, and based on evidence.</span>
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Re-rate Emotions */}
        {step === 7 && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">7</span>
              <h2 className="text-2xl font-bold text-gray-800">Re-rate Your Emotions</h2>
            </div>
            <p className="text-gray-600 mb-6">Now that you've worked through the process, how intense are your emotions? Rate them again from 0-10.</p>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="p-4 font-semibold">Emotion</th>
                            <th className="p-4 font-semibold w-40">New Intensity (0-10)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {['Anxiety', 'Sadness', 'Anger', 'Shame'].map((emotion) => (
                            <tr key={emotion} className="odd:bg-gray-50">
                                <td className="p-4 text-gray-700 font-medium">{emotion}</td>
                                <td className="p-4">
                                    <input 
                                        type="number" 
                                        min="0" max="10"
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="0-10"
                                        value={data.emotionsAfter[emotion.toLowerCase() as keyof typeof data.emotionsAfter] as string}
                                        onChange={(e) => handleEmotionChange(emotion.toLowerCase(), e.target.value, true)}
                                    />
                                </td>
                            </tr>
                        ))}
                         {data.emotions.otherName && (
                            <tr className="odd:bg-gray-50">
                                <td className="p-4 text-gray-700 font-medium">{data.emotions.otherName}</td>
                                <td className="p-4">
                                    <input 
                                        type="number" 
                                        min="0" max="10"
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="0-10"
                                        value={data.emotionsAfter.other}
                                        onChange={(e) => handleEmotionChange('other', e.target.value, true)}
                                    />
                                </td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button onClick={() => setStep(8)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Complete Session <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 8: Completion */}
        {step === 8 && (
          <div className="animate-fade-in">
             <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center mb-8">
                <h3 className="text-2xl font-bold text-green-800 mb-2">✅ Session Complete!</h3>
                <p className="text-green-700">Great work! You've successfully challenged and restructured your thought patterns. Review your responses and continue practicing this technique with other situations.</p>
             </div>

             <div className="flex justify-center">
                <button 
                  onClick={() => onComplete(data)} 
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Save & Return to Library
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};