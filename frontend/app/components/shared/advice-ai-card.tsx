
const WaveIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center animate-wave bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
    <i className="fa-solid fa-wand-magic-sparkles text-white text-lg"></i>
  </div>
);

const SmartAdviceCard = () => {
  return (
    <div className="max-w-[100%] mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-semibold text-gray-800">TechFinance AI</h2>
        <WaveIcon />
      </div>
      <p className="text-gray-600 text-justify">
        Based on your current financial data, it's essential to begin finding
        ways to generate income, which could include finding employment or
        establishing a small business. Consider reducing unnecessary expenses to
        maximize your remaining budget of <strong>$11214</strong> and think
        about creating an emergency fund, investing or saving with a proper plan
        to secure your financial future.
      </p>
    </div>
  );
};

export default SmartAdviceCard;
