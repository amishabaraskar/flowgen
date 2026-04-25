import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    title: "Basic",
    subtitle: "Perfect for occasional use",
    price: 9,
    benefits: [
      "5 FLowcharts per month",
      "Standard processing speed",
      "Basic input format",
      "Email support",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    subtitle: "For professionals and teams",
    price: 19,
    benefits: [
      "Unlimited flowcharts",
      "Priority processing",
      "Multiple input formats",
      "Multiple output formats",
      "24/7 priority support",
    ],
    highlight: true,
  },
];
function Pricing() {
  return (
    <section
      className=" w-full px-10 py-2 relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 ">
        <h3 className="text-xl font-bold text-rose-500 uppercase text-center">
          Pricing
        </h3>
        <div className="gap-8 w-full lg:flex lg:items-stretch lg:justify-between py-12 lg:py-20 sm:px-6 lg:px-8">
          {plans.map((plan, idx) => {
            return <PriceItem key={idx} {...plan} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;

function PriceItem({
  title,
  subtitle,
  benefits,
  price,
  highlight,
}: {
  title: string;
  subtitle: string;
  benefits: string[];
  price: number;
  highlight: boolean;
}) {
  return (
    <div
      className={`flex flex-col  border border-gray-300 ${
        highlight && "border-rose-500 border-2"
      } w-full    rounded-xl  text-left px-8 pt-8 mb-8 space-y-4 hover:scale-105  transform transition duration-300  `}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="">{subtitle}</p>
      <div className="flex items-center gap-2">
        <h1 className="text-5xl ">${price}</h1>
        <div className=" flex flex-col  justify-center">
          <p className="text-xs font-medium">USD</p>
          <p className=" text-xs">/month</p>
        </div>
      </div>
      <div className="space-y-3 py-5 flex-1">
        {benefits.map((benefit: string, idx: number) => {
          return (
            <div className="flex place-items-center gap-2" key={idx}>
              <Check size={18} />

              <p>{benefit}</p>
            </div>
          );
        })}
      </div>
      <button
        className={` w-full rounded-full py-2 text-white ${
          highlight
            ? "bg-linear-to-r from-rose-950 to-rose-500 border-rose-950"
            : "bg-linear-to-br from-rose-500 to-rose-400"
        } hover:bg-linear-to-l hover:from-rose-950 hover:to-rose-500 `}
      >
        <div className="flex justify-center gap-2 items-center">
          Buy Now <ArrowRight size={18} />
        </div>
      </button>
    </div>
  );
}
