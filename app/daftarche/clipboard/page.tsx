
import ClipboardForm from "@/ui/ClipboardForm";
import ClipboardItem from "@/ui/ClipboardItem";

export default function Clipboard() {
	return (
		<div>
			<h1 className='text-3xl text-center font-bold'>Clipboard</h1>
			<ClipboardForm />

			<div className='w-full flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-3xl'>
				<div className='flex *:p-5 divide-x divide-gray-200 *:font-bold'>
					<div className='flex-1'>Content</div>
					<div className='w-32'>Action</div>
				</div>

				{[...new Array(6)].map((_, index) => (
					<ClipboardItem text={index.toString()} key={index} />
				))}
			</div>
		</div>
	);
}
