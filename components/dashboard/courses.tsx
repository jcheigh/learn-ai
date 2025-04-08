const Courses = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Hi I&apos;m Courses component</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow-sm">Course 1</div>
        <div className="border rounded-lg p-4 shadow-sm">Course 2</div>
        <div className="border rounded-lg p-4 shadow-sm">Course 3</div>
      </div>
    </div>
  );
};

export default Courses;
