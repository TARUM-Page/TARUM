import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EmailSignupProps {
  className?: string;
  variant?: "hero" | "launch";
}

export function EmailSignup({ className, variant = "hero" }: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/email-signup", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our wishlist. We'll be in touch soon!",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/email-signups"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      mutation.mutate(email.trim());
    }
  };

  if (variant === "launch") {
    return (
      <div className={`glass rounded-3xl p-12 max-w-2xl mx-auto hover:bg-opacity-20 transition-all duration-300 ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={mutation.isPending}
            className="w-full px-8 py-6 rounded-2xl glass placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 text-lg transition-all duration-300 border-0 bg-transparent"
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full px-8 py-6 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
          >
            {mutation.isPending ? "Joining..." : "Join Wishlist"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`glass rounded-2xl p-8 max-w-lg mx-auto mb-12 hover:bg-opacity-20 transition-all duration-300 ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={mutation.isPending}
          className="flex-1 px-6 py-4 rounded-xl glass placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-all duration-300 border-0 bg-transparent"
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300"
        >
          {mutation.isPending ? "Joining..." : "Join Wishlist"}
        </Button>
      </form>
    </div>
  );
}
