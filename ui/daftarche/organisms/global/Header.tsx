import React from "react";
import GoBackButton from "../../../GoBackButton";
import { FiBell } from "react-icons/fi";
import AccountDropdown from "../../../AccountDropdown";
import ThemeButton from "@/ui/ThemeButton";
import LanguageSwitcher from "@/ui/LanguageSwitcher";

export default async function Header() {
	
	return (
		<header>
			<div className='px-3 lg:px-0 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<GoBackButton />
				</div>

				<div className='flex items-center gap-2'> 
					<LanguageSwitcher />
					<ThemeButton />
					<div className='button-primary'>
						<FiBell className='text-sm lg:text-xl' />
					</div>
					<AccountDropdown />
				</div>
			</div>
		</header>
	);
}
