const user = "Tahreem";

const statList = [
  { label: "Ingredients", value: "12" },
  { label: "Recipes", value: "4" },
  { label: "Avg cost", value: "$3.20", teal: true },
];

const Dashboard = () => {
  return (
    <div className="bg-background min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-white">
        Good evening, {user}
      </h1>
      <h4 className="text-sm text-gray-400 mt-1">
        What are you cooking tonight?
      </h4>

      <div className="flex gap-3 mt-6">
        {statList.map((item) => (
          <div className="bg-card rounded-2xl p-4 flex-1">
            <p className="text-muted  font-bold text-sm">{item.label}</p>
            <p
              className="text-2xl font-medium mt-1"
              style={{ color: item.teal ? "var(--color-teal)" : "#f1f5f9" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
