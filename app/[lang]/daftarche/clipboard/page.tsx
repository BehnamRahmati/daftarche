
import ClipboardForm from '@/ui/clipboard/ClipboardForm';
import ClipboardTable from '@/ui/clipboard/ClipboardTable';

export default async function Clipboard({params} : {params : Promise<{lang : 'en' | 'fa'}>}) {
	const { lang } = await params;

	return (
		<div>
			<h1 className='text-3xl text-center font-bold'>{lang === 'fa' ? 'کلیپ بورد' : 'Clipboard'}</h1>
			<ClipboardForm />
			<ClipboardTable />
		</div>
	);
}
