
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SelectedItem {
  id: string;
  reason: string;
}

const TEST_ORDER = {
  orderNumber: "1234",
  email: "return@mailship.com",
  items: [
    { id: "1", name: "Classic White T-Shirt", price: 29.99, quantity: 1 },
    { id: "2", name: "Blue Denim Jeans", price: 89.99, quantity: 2 },
    { id: "3", name: "Running Shoes", price: 119.99, quantity: 1 },
  ],
};

const RETURN_REASONS = [
  "Wrong item sent",
  "Wrong color",
  "Item doesn't fit",
  "Item arrived damaged",
];

const Index = () => {
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { toast } = useToast();

  const validateOrderDetails = () => {
    if (orderNumber === TEST_ORDER.orderNumber && email === TEST_ORDER.email) {
      setStep(2);
    } else {
      toast({
        title: "Error",
        description: "Invalid order number or email",
        variant: "destructive",
      });
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.id === itemId);
      if (isSelected) {
        return prev.filter(item => item.id !== itemId);
      } else {
        return [...prev, { id: itemId, reason: RETURN_REASONS[0] }];
      }
    });
  };

  const handleReasonChange = (itemId: string, reason: string) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, reason } : item
      )
    );
  };

  const handleSubmitReturn = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to return",
        variant: "destructive",
      });
      return;
    }

    const hasInvalidReasons = selectedItems.some(item => !item.reason);
    if (hasInvalidReasons) {
      toast({
        title: "Error",
        description: "Please select a return reason for all items",
        variant: "destructive",
      });
      return;
    }

    setStep(3);
    toast({
      title: "Return Initiated",
      description: "Your return request has been processed successfully.",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={(e) => { e.preventDefault(); validateOrderDetails(); }} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="orderNumber" className="text-sm font-medium text-gray-700 text-left block">
                Order Number
              </label>
              <Input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                className="w-full transition-all duration-200 ease-in-out focus:border-[#db2b19] focus:ring-[#db2b19]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 text-left block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full transition-all duration-200 ease-in-out focus:border-[#db2b19] focus:ring-[#db2b19]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#db2b19] hover:bg-[#db2b19]/90 text-white transition-all duration-200"
            >
              Continue
            </Button>
          </form>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Select items to return and provide a reason:</p>
            <div className="space-y-3">
              {TEST_ORDER.items.map((item) => {
                const selectedItem = selectedItems.find(si => si.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg transition-all cursor-pointer ${
                      selectedItem
                        ? "border-[#db2b19] bg-red-50"
                        : "border-gray-200 hover:border-[#db2b19]"
                    }`}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} | ${item.price}
                        </p>
                      </div>
                      <div
                        className={`p-2 rounded-full transition-colors ${
                          selectedItem
                            ? "bg-[#db2b19] text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                    {selectedItem && (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={selectedItem.reason}
                          onChange={(e) => handleReasonChange(item.id, e.target.value)}
                          className="w-full p-2 border rounded bg-white text-sm focus:border-[#db2b19] focus:ring-[#db2b19]"
                        >
                          {RETURN_REASONS.map((reason) => (
                            <option key={reason} value={reason}>
                              {reason}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Button
              onClick={handleSubmitReturn}
              className="w-full bg-[#db2b19] hover:bg-[#db2b19]/90 text-white transition-all duration-200 mt-4"
            >
              Submit Return
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Return Submitted Successfully!</h3>
            <p className="text-gray-600">
              Your return shipping label has been generated and sent to your email.
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Please pack your items and attach the shipping label to your package.
                Drop off your package at any authorized shipping location.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-[#db2b19]">
            Mailship Return Portal
          </h1>
          <p className="text-gray-500">
            Complete your return in 3 simple steps
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber === step
                  ? "bg-[#db2b19] text-white"
                  : stepNumber < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber < step ? (
                <Check className="h-4 w-4" />
              ) : (
                stepNumber
              )}
            </div>
          ))}
        </div>

        <Card className="p-6 border-[#db2b19] border">
          {renderStep()}
        </Card>

        <p className="text-sm text-gray-500 mt-4">
          Need help? Contact our support team
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
