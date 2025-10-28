"use client";
import ChatBot from "react-chatbotify";

export default function SupportChat() {
  const id = "my-chatbot-id";

  const flow = {
    start: {
      message:
        "Hi there! Welcome to our job platform. How can I help you today?",
      path: "menu",
    },

    menu: {
      message: "Please choose one of the following options:",
      options: ["I'm a Job Seeker", "I'm an Employer", "General Help"],
      path: (params: { userInput: string }) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("seeker")) return "jobseeker";
        if (input.includes("employer")) return "employer";
        if (input.includes("help")) return "general";
        return "menu";
      },
    },

    jobseeker: {
      message: "Great! What would you like to know?",
      options: [
        "Browse jobs",
        "Apply for a job",
        "Track my applications",
        "Back to main menu",
      ],
      path: (params: { userInput: string }) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("browse")) return "browse_jobs";
        if (input.includes("apply")) return "apply_jobs";
        if (input.includes("track")) return "track_jobs";
        if (input.includes("back")) return "menu";
        return "jobseeker";
      },
    },

    browse_jobs: {
      message:
        "💼 You can browse jobs on our ‘Jobs’ page — filter by category, type or location.",
      path: "jobseeker",
    },

    apply_jobs: {
      message:
        "📝 To apply: Open any job → Click ‘Apply Now’ → Upload your CV → Submit!",
      path: "jobseeker",
    },

    track_jobs: {
      message: "📊 Go to Dashboard → Applications to check your status.",
      path: "jobseeker",
    },

    employer: {
      message: "Welcome Employer! What do you need help with?",
      options: [
        "Post a job",
        "View applicants",
        "Edit or delete jobs",
        "Back to main menu",
      ],
      path: (params: { userInput: string }) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("post")) return "post_job";
        if (input.includes("view")) return "view_applicants";
        if (input.includes("edit")) return "edit_jobs";
        if (input.includes("back")) return "menu";
        return "employer";
      },
    },

    post_job: {
      message:
        "📢 To post a job: Go to Employer Dashboard → ‘Post Job’ → Fill details → Publish!",
      path: "employer",
    },

    view_applicants: {
      message:
        "👥 You can view applicants in Employer Dashboard → ‘Applicants’ section.",
      path: "employer",
    },

    edit_jobs: {
      message: "✏️ Go to ‘My Jobs’ → Select job → Edit or Delete as needed.",
      path: "employer",
    },

    general: {
      message: "Sure! What do you need help with today?",
      options: [
        "Account Issues",
        "Payments",
        "Contact Support",
        "Back to main menu",
      ],
      path: (params: { userInput: string }) => {
        const input = params.userInput.toLowerCase();
        if (input.includes("account")) return "account_help";
        if (input.includes("payment")) return "payment_help";
        if (input.includes("contact")) return "contact_help";
        if (input.includes("back")) return "menu";
        return "general";
      },
    },

    account_help: {
      message:
        "🔐 To fix account issues: Go to ‘Settings’ → ‘Profile’ → Update or Reset your password.",
      path: "general",
    },

    payment_help: {
      message:
        "💳 Visit ‘Plans & Pricing’ to view subscription details and billing info.",
      path: "general",
    },

    contact_help: {
      message:
        "📨 You can reach our support team at support@yourjobportal.com.",
      path: "general",
    },
  };

  return (
    <ChatBot
      styles={{
        headerStyle: {
          background: "linear-gradient(135deg, #f0efca, #83a7dc)",
          color: "white",
          fontWeight: 700,
        },
        chatButtonStyle: {
          width: 60,
          height: 60,
          right: 25,
          bottom: 25,
        },
      }}
      settings={{
        general: {
          showHeader: true,
          showFooter: false,
        },
        chatButton: {},
        tooltip: {
          mode: "NEVER",
          text: "",
        },
        header: {
          title: "Glow Gigs",
        },
      }}
      id={id}
      flow={flow}
    />
  );
}
