import { Button, Card, Chip } from "@heroui/react";
import { FaCheck, FaCrown, FaRocket } from "react-icons/fa";

const PricingPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Hero */}

      <div className="text-center mb-16">
        <Chip color="warning" variant="flat">
          Pricing Plans
        </Chip>

        <h1 className="text-5xl font-bold mt-5">
          Choose Your Perfect Plan
        </h1>

        <p className="text-default-500 mt-4 max-w-2xl mx-auto">
          Unlock premium AI prompts, advanced tools, and exclusive content to
          boost your productivity.
        </p>
      </div>

      {/* Pricing Cards */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Free */}

        <Card className="p-8 shadow-md border">

          <div className="flex items-center gap-3">
            <FaRocket className="text-2xl text-primary" />
            <h2 className="text-3xl font-bold">
              Free
            </h2>
          </div>

          <h1 className="text-5xl font-bold mt-6">
            $0
            <span className="text-lg text-default-500">
              /month
            </span>
          </h1>

          <p className="mt-3 text-default-500">
            Perfect for beginners exploring AI prompts.
          </p>

          <div className="space-y-4 mt-8">

            {[
              "Browse public prompts",
              "Copy public prompts",
              "Submit up to 3 prompts",
              "Bookmark prompts",
              "Write reviews",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <FaCheck className="text-success" />
                <span>{item}</span>
              </div>
            ))}

          </div>

          <Button
            className="mt-10"
            variant="bordered"
            fullWidth
          >
            Current Plan
          </Button>

        </Card>

        {/* Premium */}

        <Card className="relative p-8 border-2 border-warning shadow-2xl">

          <Chip
            color="warning"
            className="absolute right-5 top-5"
          >
            Most Popular
          </Chip>

          <div className="flex items-center gap-3">

            <FaCrown className="text-2xl text-warning" />

            <h2 className="text-3xl font-bold">
              Premium
            </h2>

          </div>

          <h1 className="text-5xl font-bold mt-6">
            $14.00
            <span className="text-lg text-default-500">
              /month
            </span>
          </h1>

          <p className="mt-3 text-default-500">
            Unlock everything and access exclusive premium prompts.
          </p>

          <div className="space-y-4 mt-8">

            {[
              "Everything in Free",
              "Unlimited prompt creation",
              "Access private/premium prompts",
              "Unlimited copy",
              "Priority support",
              "Premium badge",
              "Future premium updates",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <FaCheck className="text-success" />
                <span>{item}</span>
              </div>
            ))}

          </div>
          <form method="POST" action={'/api/subscription'}>
                <Button
                    type="submit"
                    className="mt-10 text-white bg-[#6F5B50]"
                    fullWidth
                >
                    Subscribe Now
                </Button>
          </form>

          

        </Card>

      </div>

      {/* Comparison */}

      <div className="mt-24 text-center">

        <h2 className="text-4xl font-bold mb-10">
          Why Go Premium?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Card className="p-8">

            <FaCrown className="text-5xl text-warning mx-auto mb-5" />

            <h3 className="font-bold text-xl">
              Premium Prompts
            </h3>

            <p className="text-default-500 mt-3">
              Access exclusive AI prompts unavailable to free users.
            </p>

          </Card>

          <Card className="p-8">

            <FaRocket className="text-5xl text-primary mx-auto mb-5" />

            <h3 className="font-bold text-xl">
              Unlimited Productivity
            </h3>

            <p className="text-default-500 mt-3">
              Create and manage unlimited prompts without restrictions.
            </p>

          </Card>

          <Card className="p-8">

            <FaCheck className="text-5xl text-success mx-auto mb-5" />

            <h3 className="font-bold text-xl">
              Priority Experience
            </h3>

            <p className="text-default-500 mt-3">
              Enjoy priority support and receive future premium features first.
            </p>

          </Card>

        </div>

      </div>

    </div>
  );
};

export default PricingPage;