import {
  ArrowRight,
  BrainCircuit,
  FileOutput,
  FileText,
  LucideArrowRight,
  MoveRight,
} from "lucide-react";

function HowItWorks() {
  return (
    <section className="py-40 relative overflow-hidden  mx-auto flex flex-col items-center">
      <h2 className="text-xl font-bold text-center mb-4 text-rose-500">
        HOW IT WORKS
      </h2>
      <h1 className="text-3xl max-w-3xl font-bold text-center mb-24">
        Transform Your Processes into easy-to-understand Flowcharts in three
        simple steps
      </h1>
      <div className="flex flex-row flex-nowrap  justify-evenly gap-3">
        <div className="how-it-works-card">
          <FileText className="text-rose-500" size={64} strokeWidth={1.5} />
          <h3 className="text-xl font-bold mb-4 ">Describe Your Process</h3>
          <p className="text-gray-600 text-sm">
            Simply describe your process in plain language.
          </p>
        </div>

        <MoveRight
          className="self-center text-rose-500 "
          size={32}
          strokeWidth={1}
        />

        <div className="how-it-works-card">
          <BrainCircuit className="text-rose-500" size={64} strokeWidth={1.5} />
          <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
          <p className="text-gray-600 text-sm">
            Our advanced AI processes and analyzes your process instantly
          </p>
        </div>
        <MoveRight
          className="self-center text-rose-500 "
          size={32}
          strokeWidth={1}
        />
        <div className="how-it-works-card">
          <FileOutput className="text-rose-500" size={64} strokeWidth={1.5} />

          <h3 className="text-xl font-bold mb-4">Get the Flowchart</h3>
          <p className="text-gray-600 text-sm">
            You can download the flowchart and share it with your team or
            stakeholders.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
