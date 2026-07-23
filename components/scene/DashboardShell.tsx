"use client";

import type { ReactNode } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderKanban,
  BarChart3,
  Settings,
  Upload,
  User,
  Video,
} from "lucide-react";

// Shared left-sidebar shell for both the Pharma-facing screens (Shop,
// Checkout) and the Speaker-facing upload screen — same visual system,
// different nav items per audience. v1, built without the real dashboard
// reference — swap in exact nav items/styling once we have screenshots.
const PHARMA_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "shop", label: "Shop", icon: ShoppingBag },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const SPEAKER_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "assignments", label: "My Assignments", icon: FolderKanban },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "videos", label: "My Videos", icon: Video },
  { id: "profile", label: "Profile", icon: User },
] as const;

type PharmaNavId = (typeof PHARMA_NAV)[number]["id"];
type SpeakerNavId = (typeof SPEAKER_NAV)[number]["id"];

export function DashboardShell({
  active,
  variant = "pharma",
  children,
}: {
  active: PharmaNavId | SpeakerNavId;
  variant?: "pharma" | "speaker";
  children: ReactNode;
}) {
  const items = variant === "speaker" ? SPEAKER_NAV : PHARMA_NAV;
  const accountLabel = variant === "speaker" ? "Speaker Account" : "Pharma Account";
  const badgeLetter = variant === "speaker" ? "S" : "P";

  return (
    <div className="min-h-full w-full bg-[#F3F6FB]">
      {/* Fixed regardless of scroll position — the scene's own scroll
          container lives further up the tree (SceneController), so pinning
          this via position:fixed is the only way to keep it stationary. */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-none flex-col border-r border-[#E1E9F8] bg-white px-4 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/doctorflix-logo.svg" alt="Doctorflix" className="mb-8 h-6 px-2" />
        <nav className="flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#159F95]/10 text-[#159F95]"
                    : "text-[#42506B] hover:bg-[#F3F6FB]"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 rounded-full border border-[#E1E9F8] px-3 py-2 text-xs font-medium text-[#42506B]">
          <span className="flex size-6 items-center justify-center rounded-full bg-[#1A2133] text-[10px] font-bold text-white">
            {badgeLetter}
          </span>
          {accountLabel}
        </div>
      </aside>
      <div className="min-h-full min-w-0 pl-60">{children}</div>
    </div>
  );
}
