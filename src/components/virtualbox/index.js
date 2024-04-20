import formatCurrency from '../../utils/formatCurrency';

export default function Virtualbox({ data = [], title }) {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="grid grid-cols-12 gap sticky top-0 bg-zinc-950 inset-0 p-2">
        <div className="col-span-6 uppercase">{title}</div>
        <div className="col-span-6 uppercase ">Quantity</div>
      </div>

      {data.map((item, i) => {
        const currency = formatCurrency(item[0]);
        const qty = formatCurrency(item[1])
          ?.replace('$', '')
          .replace('.00', '');
        return (
          <div key={i} className="grid grid-cols-12 gap-2 px-2">
            <div className="col-span-6">{currency}</div>
            <div className="col-span-6">{qty}</div>
          </div>
        );
      })}
    </div>
  );
}
