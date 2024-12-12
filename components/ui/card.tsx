export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border rounded-lg shadow-md p-6 bg-white">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
);
