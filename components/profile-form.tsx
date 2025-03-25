'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UserCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name (letters, spaces, hyphens and apostrophes only)")
    .refine((val) => val.trim().length > 0, "Name cannot be empty"),
  
  occupation: z.string()
    .min(2, "Occupation must be at least 2 characters")
    .max(100, "Occupation description is too long")
    .regex(/^[a-zA-Z\s\-&(),\.]+$/, "Please enter a valid occupation (avoid special characters)")
    .refine((val) => !val.includes("asdf"), "Please enter a real occupation")
    .refine((val) => !val.includes("123"), "Please enter a real occupation")
    .refine((val) => val.trim().length > 0, "Occupation cannot be empty"),
  
  interests: z.string()
    .min(2, "Interests must be at least 2 characters")
    .max(200, "Interest description is too long")
    .regex(/^[a-zA-Z\s\-&(),\.]+$/, "Please enter valid interests (avoid special characters)")
    .refine((val) => !val.includes("asdf"), "Please enter real interests")
    .refine((val) => !val.includes("123"), "Please enter real interests")
    .refine((val) => val.trim().length > 0, "Interests cannot be empty"),
});

type ProfileFormData = z.infer<typeof formSchema>;

export function ProfileForm() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      occupation: '',
      interests: '',
    },
  });

  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        form.reset(parsedProfile);
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, [form]);

  const onSubmit = (data: ProfileFormData) => {
    // Additional validation for nonsensical inputs
    const nonsensicalPatterns = [
      /^\s*[^a-zA-Z\s]+\s*$/,  // Only non-letters
      /^[a-z]{1,2}$/,          // Too short to be meaningful
      /^(xxx|zzz|aaa)/i,       // Repeated characters
      /^test\d*$/i,            // Test entries
    ];

    const hasNonsensicalInput = Object.entries(data).some(([field, value]) => {
      if (nonsensicalPatterns.some(pattern => pattern.test(value))) {
        toast({
          title: "Invalid Input",
          description: `Please provide a meaningful ${field}`,
          variant: "destructive",
          className: "bg-neutral-900 border-red-800/40 text-neutral-200",
        });
        return true;
      }
      return false;
    });

    if (hasNonsensicalInput) {
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(data));
    setIsOpen(false);
    
    toast({
      title: "Profile saved",
      description: "Your information has been stored locally.",
      className: "bg-neutral-900 border-neutral-800 text-neutral-200",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ProfileFormData) => {
    const value = e.target.value;
    
    // Check for obvious garbage input
    if (/^[^a-zA-Z]*$/.test(value) && value.length > 3) {
      toast({
        title: "Invalid Input",
        description: `Please enter proper text for ${fieldName}`,
        variant: "destructive",
        className: "bg-neutral-900 border-red-800/40 text-neutral-200",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-neutral-500 hover:text-neutral-400 font-mono text-sm border border-neutral-800 h-8 px-3"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          tell us who you are
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-200 font-mono">Your Profile</DialogTitle>
          <DialogDescription className="text-neutral-400 font-mono">
            Share a bit about yourself. This helps personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300 font-mono">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="bg-neutral-950 border-neutral-800 text-neutral-200 font-mono"
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e, 'name');
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300 font-mono">Occupation</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="What do you do?" 
                      className="bg-neutral-950 border-neutral-800 text-neutral-200 font-mono"
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e, 'occupation');
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300 font-mono">Interests</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="What interests you?" 
                      className="bg-neutral-950 border-neutral-800 text-neutral-200 font-mono"
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e, 'interests');
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-xs" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
