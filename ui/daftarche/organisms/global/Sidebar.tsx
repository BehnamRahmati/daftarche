import React from 'react';
import SidebarMenu from '../../molecules/SidebarMenu';

function Sidebar() {
	return (
		<aside className='shrink-0 lg:min-h-full flex flex-col '>
			<SidebarMenu />
		</aside>
	);
}

export default React.memo(Sidebar)
