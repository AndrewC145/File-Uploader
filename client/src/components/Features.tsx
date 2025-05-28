type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
};

function Features() {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          Our Features
        </h1>
        <p className="text-md mt-5">These are some of the features we offer here at Packet</p>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, image }: FeatureCardProps) {}

export default Features;
