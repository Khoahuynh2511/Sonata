"use client";
import { ADMIN_TOKEN } from "@/constant/adminToken";
import CustomImage from "@/components/CustomImage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import styles from "./adminNavbar.module.css";
import { LogOut } from "lucide-react";

// if somebody uses this it needs to pass something in it
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // add hooks navigation
  const router = useRouter();
  const pathName = usePathname();

  // Compute the “active key” from the path:
  const activeItem = React.useMemo(() => {
    if (pathName.startsWith("/admin-artists-management")) return "artists";
    if (pathName.startsWith("/admin-view-all")) return "viewAll";
    if (pathName.startsWith("/admin-categories-all")) return "categories";
    if (pathName === "/admin-contributor-management") return "contributors";
    return "dashboard";
  }, [pathName]);

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN); // hoặc key mà mày lưu
    if (!token) {
      // nếu không có token → redirect về login
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="fixed w-full">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar matching new Navbar style */}
        <aside className="w-48 h-screen pb-24 bg-gradient-to-b from-[#3A2A24] to-[#1A0F0D] flex flex-col justify-between border-r border-[#D3B995] shadow-lg">
          {/* TOP: Logo + Nav */}
          <div>
            <div className="flex justify-center p-6">
              <div className="relative">
                <h1 className="text-[#C8A97E] font-['Playfair_Display',serif] text-3xl tracking-wide">Sonata</h1>
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent"></div>
              </div>
            </div>
            <nav className="flex-1 pt-2">
              <ul className={styles.menu}>
                {/* Artist Management */}
                <li
                  className={`${styles.menuItem} ${
                    activeItem === "artists" ? styles.active : ""
                  }`}
                  onClick={() => router.push("/admin-artists-management")}
                >
                  <CustomImage
                    src="/layout_imgs/search_logo.png"
                    alt="search logo"
                    height={20} // equivalent to h-5 (20px)
                    width={20} // equivalent to w-5 (20px)
                    className="object-contain" // optional to ensure proper scaling
                  />
                  <span className="text-base">Artists Management</span>
                </li>

                {/* Songs & Albums Management */}
                <li
                  className={`${styles.menuItem} ${
                    activeItem === "viewAll" ? styles.active : ""
                  }`}
                  onClick={() => router.push("/admin-view-all")}
                >
                  <CustomImage
                    src="/layout_imgs/library_logo.png"
                    alt="Library logo"
                    height={20} // equivalent to h-5 (20px)
                    width={20} // equivalent to w-5 (20px)
                    className="object-contain" // optional to ensure proper scaling
                  />
                  <span className="text-base">Songs & Albums Management</span>
                </li>

                {/* Category Manage*/}
                <li
                  className={`${styles.menuItem} ${
                    activeItem === "categories" ? styles.active : ""
                  }`}
                  onClick={() => router.push("/admin-categories-all")}
                >
                  <CustomImage
                    src="/layout_imgs/createPlaylist_logo.png"
                    alt="create playlist logo"
                    height={20} // equivalent to h-5 (20px)
                    width={20} // equivalent to w-5 (20px)
                    className="object-contain" // optional to ensure proper scaling
                  />
                  <span className="text-base">Category Management</span>
                </li>

                {/* Contributors Manage*/}
                <li
                  className={`${styles.menuItem} ${
                    activeItem === "contributors" ? styles.active : ""
                  }`}
                  onClick={() => router.push("/admin-contributor-management")}
                >
                  <CustomImage
                    src="/layout_imgs/contributor.png"
                    alt="create playlist logo"
                    height={20} // equivalent to h-5 (20px)
                    width={20} // equivalent to w-5 (20px)
                    className="object-contain bg-white" // optional to ensure proper scaling
                  />
                  <span className="text-base">Contributors Management</span>
                </li>
              </ul>
            </nav>
          </div>

          {/* BOTTOM: Logout button */}
          <div className="p-4 border-t border-[#D3B995]">
            <button
              onClick={() => {
                localStorage.removeItem(ADMIN_TOKEN);
                router.replace("/admin/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#C8A97E] hover:bg-[#48352F] rounded-md transition-all duration-300"
            >
              <LogOut size={20} />
              <span className="font-['Playfair_Display',serif]">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Page Content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
