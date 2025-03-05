import React from "react";
import GoBackButton from "../../../GoBackButton";
import { FiBell } from "react-icons/fi";
import AccountDropdown from "../../../AccountDropdown";
import ThemeButton from "@/ui/ThemeButton";
import LanguageSwitcher from "@/ui/LanguageSwitcher";

export default async function Header() {
	
	return (
		<header>
			<div className='lg:pt-10 pb-5 px-3 lg:px-0 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<GoBackButton />
				</div>

				<div className='flex items-center gap-2'> 
					<LanguageSwitcher />
					<ThemeButton />
					<div className='bg-gray-200 dark:bg-[var(--foreground)] rounded-xl w-10 h-10 flex items-center justify-center'>
						<FiBell size={20} />
					</div>
					<AccountDropdown />
				</div>
			</div>
		</header>
	);
}
