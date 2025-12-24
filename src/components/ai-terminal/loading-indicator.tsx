export default function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2 ml-4 animate-pulse">
      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}