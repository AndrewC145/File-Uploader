type FormTemplateProps = {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function FormTemplate({ title, children, onSubmit }: FormTemplateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center font-nunito">
      <form
        onSubmit={onSubmit}
        method="POST"
        className="flex w-[70%] flex-col space-y-4 rounded-2xl border-2 border-blue-300 p-4 sm:w-[45%] sm:space-y-5 sm:p-6 md:w-[40%] md:space-y-6 md:p-8 lg:w-[30%] lg:px-10 xl:space-y-8 xl:px-12"
      >
        <h1 className="text-center text-lg sm:text-xl md:text-2xl">{title}</h1>
        {children}
      </form>
    </main>
  );
}

export default FormTemplate;
