import { Phone, MessageSquare, Leaf } from "lucide-react";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col font-sans">
      {/* Minimal header */}
      <header className="px-6 py-5 flex items-center gap-2.5">
        <div className="bg-green-700 p-1.5 rounded-md">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <a href="/" className="font-bold text-stone-900 tracking-tight text-[17px]">
          Reaper Landscaping
        </a>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-24">
        <p className="text-[9rem] font-black font-serif text-green-800/10 leading-none select-none mb-0" aria-hidden="true">
          404
        </p>
        <div className="-mt-6">
          <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-serif font-bold text-stone-900 mb-4 leading-[1.15]">
            This page doesn't exist.
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
            But your lawn still needs cutting. Head back home or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-7 py-3.5 rounded-xl text-[16px] transition-colors shadow-md"
            >
              Back to Home
            </a>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 hover:bg-green-50 font-bold px-7 py-3.5 rounded-xl text-[16px] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href={SMS_LINK}
              className="inline-flex items-center justify-center gap-2 text-stone-600 border-2 border-stone-200 hover:border-stone-300 font-bold px-7 py-3.5 rounded-xl text-[16px] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Text Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
