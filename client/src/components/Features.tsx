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
            description="Packet makes it easy to store your files in the cloud. With our user-friendly interface, you can upload, organize, and access your files from anywhere, anytime."
            image={easyCloud}
          />
        </div>
        <FeatureCard
          title="Secure Access"
          description="Packet ensures that your files are stored securely. We use advanced encryption and security protocols to protect your data, so you can have peace of mind knowing your files are safe."
          image={serverImg}
          vertical={true}
        />
        <FeatureCard
          title="Access Anywhere"
          description="Packet allows you to access your files from any device with an internet connection. Whether you're on a computer, tablet, or smartphone, you can easily retrieve your files whenever you need them."
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
