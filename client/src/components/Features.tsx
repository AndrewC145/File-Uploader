import easyCloud from "../assets/images/easy-cloud.jpg";
import serverImg from "../assets/images/server.jpg";
import computerImg from "../assets/images/computer.jpg";

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  vertical?: boolean;
};

function Features() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl">
          Our Features
        </h1>
        <p className="text-md mt-5">These are some of the features we offer here at Packet</p>
      </div>
      <div className="mx-20 grid grid-cols-2 grid-rows-[auto_1fr] gap-5">
        <div className="col-span-2">
          <FeatureCard
            title="Convenient Storage"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            image={easyCloud}
          />
        </div>
        <FeatureCard
          title="Secure Access"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          image={serverImg}
          vertical={true}
        />
        <FeatureCard
          title="Access Anywhere"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          image={computerImg}
          vertical={true}
        />
      </div>
    </section>
  );
}

function FeatureCard({ title, description, image, vertical }: FeatureCardProps) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center rounded-xl bg-gray-200 px-10 pt-10">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{title}</h2>
          <p className="mt-3 mb-8 text-base">{description}</p>
        </div>
        <div className="flex w-full justify-center">
          <img
            className="h-[200px] w-[250px] rounded-t-2xl object-cover sm:w-[350px] md:h-[300px] md:w-[450px] lg:w-[550px] xl:w-[650px] 2xl:h-[350px] 2xl:w-[700px]"
            src={image}
            alt={title}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[300px] gap-20 rounded-xl bg-gray-200 px-10 pt-10 sm:h-[400px] md:h-[450px] xl:h-[500px]">
      <div className="max-w-[30%] xl:max-w-[50%]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{title}</h2>
        <p className="mt-3 text-base">{description}</p>
      </div>
      <div className="w-[100%]">
        <img className="size-full rounded-t-2xl object-cover" src={image} />
      </div>
    </div>
  );
}

export default Features;
