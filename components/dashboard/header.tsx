interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  return (
    <div className="p-6 border-b">
      <h1 className="text-2xl font-bold">Welcome {userName}!</h1>
    </div>
  );
};

export default Header;
