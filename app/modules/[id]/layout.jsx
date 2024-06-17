import Link from "next/link";

const CourseDetailLayout = ({ children, params }) => {
  return (
    <div>
      <header>
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/modules">Modules</Link>
          <span> / </span>
          <Link href={`/modules/${params.courseId}`}>Course Details</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default CourseDetailLayout;
