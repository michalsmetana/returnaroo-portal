
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter an order number",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Return Initiated",
      description: "We'll email you the next steps shortly.",
    });
    setOrderNumber("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Easy Returns
          </h1>
          <p className="text-gray-500">
            Start your return process in seconds
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="orderNumber"
                className="text-sm font-medium text-gray-700 text-left block"
              >
                Order Number
              </label>
              <Input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                className="w-full transition-all duration-200 ease-in-out"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-200"
            >
              Start Return
            </Button>
          </form>
        </Card>

        <p className="text-sm text-gray-500 mt-4">
          Need help? Contact our support team
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
