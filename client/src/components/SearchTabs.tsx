import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertTriangle, Info, Mail, Shield, Smartphone } from "lucide-react";
import { searchBreachesByEmail, searchBreachesByPhone, checkPasswordBreach } from "@/lib/breachApi";
import { BreachSearchResult, PasswordCheckResult, PhoneSearchResult } from "@shared/schema";
import { toast } from "@/hooks/use-toast";

interface SearchTabsProps {
  onSearchComplete: (
    result: BreachSearchResult | PasswordCheckResult | PhoneSearchResult,
    searchType: "email" | "password" | "phone",
    searchValue: string
  ) => void;
  onSearchStart: () => void;
}

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z.object({
  password: z.string().min(1, "Please enter a password to check"),
});

const phoneSchema = z.object({
  phone: z.string().min(7, "Please enter a valid phone number"),
});

const SearchTabs: React.FC<SearchTabsProps> = ({ 
  onSearchComplete, 
  onSearchStart
}) => {
  const [activeTab, setActiveTab] = useState<string>("email");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form for email search
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for password search
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Form for phone search
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmitEmail = async (values: z.infer<typeof emailSchema>) => {
    try {
      onSearchStart();
      const result = await searchBreachesByEmail(values.email);
      onSearchComplete(result, "email", values.email);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for breaches. Please try again.",
        variant: "destructive",
      });
      console.error("Error searching email:", error);
    }
  };

  const onSubmitPassword = async (values: z.infer<typeof passwordSchema>) => {
    try {
      onSearchStart();
      const result = await checkPasswordBreach(values.password);
      onSearchComplete(result, "password", "********");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check password. Please try again.",
        variant: "destructive",
      });
      console.error("Error checking password:", error);
    }
  };

  const onSubmitPhone = async (values: z.infer<typeof phoneSchema>) => {
    try {
      onSearchStart();
      const result = await searchBreachesByPhone(values.phone);
      onSearchComplete(result, "phone", values.phone);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for breaches. Please try again.",
        variant: "destructive",
      });
      console.error("Error searching phone:", error);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs 
            defaultValue="email" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Password
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center">
                <Smartphone className="mr-2 h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            {/* Email Tab Content */}
            <TabsContent value="email" className="p-6">
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                  className="space-y-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your email address:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="you@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2 text-sm text-slate-500">
                    <p className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      We'll check if your email has appeared in any known data breaches. This search is 100% free.
                    </p>
                    <p className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Your data is never stored and searches are secure and private.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={emailForm.formState.isSubmitting}
                  >
                    Check for Breaches
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Password Tab Content */}
            <TabsContent value="password" className="p-6">
              <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Important Security Information</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Your password is never sent to our servers. We use a secure k-anonymity method that only sends a partial hash of your password to check against known breaches.
                </AlertDescription>
              </Alert>

              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter a password to check:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password to check"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-8 w-8 p-0"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-sm text-slate-500">
                    <p className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      We use the same secure method as HIBP (Have I Been Pwned) to safely check your password.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    Check Password Safely
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Phone Tab Content */}
            <TabsContent value="phone" className="p-6">
              <Form {...phoneForm}>
                <form
                  onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                  className="space-y-4"
                >
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your phone number:</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <p className="text-xs text-slate-500 mt-1">
                          Include country code (e.g., +1 for US)
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2 text-sm text-slate-500">
                    <p className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      We'll check if your phone number has appeared in any known data breaches. This search is 100% free.
                    </p>
                    <p className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Your phone number is never stored after the search is complete.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={phoneForm.formState.isSubmitting}
                  >
                    Check for Breaches
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SearchTabs;
