import { useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

type Burger = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

const whatsappNumber = "5500000000000";

const burgers: Burger[] = [
  {
    name: "Smash Classico",
    description: "Blend da casa, cheddar, picles, cebola grelhada e molho especial.",
    price: "R$ 32,00",
    category: "Classico",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bacon Melt",
    description: "Duplo smash, bacon crocante, queijo prato e maionese defumada.",
    price: "R$ 39,00",
    category: "Bacon",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Burger Brisket",
    description: "Carne desfiada, barbecue artesanal, coleslaw e pao brioche.",
    price: "R$ 46,00",
    category: "Premium",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Vegetal Crocante",
    description: "Hamburguer vegetal, salada fresca, queijo, cebola roxa e molho verde.",
    price: "R$ 34,00",
    category: "Vegetal",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80",
  },
];

const sandwiches: Burger[] = [
  {
    name: "Sanduíche Frango Club",
    description: "Frango grelhado, queijo, alface, tomate e maionese temperada no pão tostado.",
    price: "R$ 29,00",
    category: "Sanduíche",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sanduíche Costela",
    description: "Costela desfiada, queijo derretido, cebola caramelizada e barbecue.",
    price: "R$ 36,00",
    category: "Sanduíche",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80",
  },
];

const pizzasMenu: Burger[] = [
  {
    name: "Pizza Pepperoni",
    description: "Massa fina, molho de tomate, mozzarella, pepperoni e orégano.",
    price: "R$ 49,00",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pizza Quatro Queijos",
    description: "Mozzarella, parmesão, provolone, gorgonzola e toque de azeite.",
    price: "R$ 54,00",
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80",
  },
];

const combosMenu: Burger[] = [
  {
    name: "Combo Smash",
    description: "Smash Clássico, batata crocante e bebida gelada.",
    price: "R$ 44,00",
    category: "Combo",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Combo Duplo Bacon",
    description: "Bacon Melt, batata grande, molho especial e bebida.",
    price: "R$ 58,00",
    category: "Combo",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80",
  },
];

const menuItems = [...burgers, ...sandwiches, ...pizzasMenu, ...combosMenu];

const categories = [
  {
    name: "Todos",
    filter: "Todos",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sanduíches",
    filter: "Sanduíche",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Pizzas",
    filter: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Combos",
    filter: "Combo",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Hambúrgueres",
    filter: "Hambúrguer",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
  },
];

const getItemGroup = (item: Burger) => {
  if (item.category === "Sanduíche" || item.category === "Pizza" || item.category === "Combo") {
    return item.category;
  }

  return "Hambúrguer";
};

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 6h2l1.3 8.2a2 2 0 0 0 2 1.8h5.9a2 2 0 0 0 1.9-1.4L20 9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 20h.01M17 20h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type CartDrawerProps = {
  isOpen: boolean;
  items: Array<{ burger: Burger; amount: number }>;
  orderUrl: string;
  onClose: () => void;
  onChangeAmount: (burger: Burger, delta: number) => void;
  onRemove: (burger: Burger) => void;
};

function CartDrawer({ isOpen, items, orderUrl, onClose, onChangeAmount, onRemove }: CartDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const totalItems = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="fixed inset-0 z-[60] bg-black/62">
      <button className="absolute inset-0 h-full w-full cursor-default" type="button" onClick={onClose} aria-label="Fechar carrinho" />
      <aside className="absolute bottom-0 right-0 flex max-h-[88vh] w-full flex-col rounded-t-lg bg-[#111111] p-5 text-white shadow-[0_-20px_46px_rgba(0,0,0,0.35)] sm:top-0 sm:h-full sm:max-h-none sm:w-[390px] sm:rounded-l-lg sm:rounded-tr-none">
        <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#82b94e]">Carrinho</p>
            <h2 className="mt-1 font-serif text-3xl">
              {totalItems === 0 ? "Nenhum item" : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
            </h2>
          </div>
          <button type="button" className="rounded-lg border border-white/18 px-3 py-2 text-sm font-bold" onClick={onClose}>
            Fechar
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-5 pr-1">
          {items.length > 0 ? (
            items.map(({ burger, amount }) => (
              <div key={burger.name} className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{burger.name}</h3>
                    <p className="mt-1 text-sm text-white/62">{burger.price}</p>
                  </div>
                  <button type="button" className="text-sm font-bold text-[#82b94e]" onClick={() => onRemove(burger)}>
                    Excluir
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-[42px_minmax(0,1fr)_42px] gap-3">
                  <button type="button" className="h-11 rounded-lg border border-white/16 text-xl font-black" onClick={() => onChangeAmount(burger, -1)}>
                    -
                  </button>
                  <span className="flex h-11 items-center justify-center rounded-lg bg-black/35 font-black">
                    {amount}
                  </span>
                  <button type="button" className="h-11 rounded-lg bg-[#82b94e] text-xl font-black text-[#111111]" onClick={() => onChangeAmount(burger, 1)}>
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-white/18 p-4 text-sm leading-6 text-white/62">
              Adicione hambúrgueres para revisar seu pedido aqui.
            </p>
          )}
        </div>

        <a
          href={orderUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full justify-center rounded-lg bg-[#82b94e] px-4 py-4 text-sm font-black text-[#111111]"
        >
          Enviar pelo WhatsApp
        </a>
      </aside>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const selectedBurgers = useMemo(
    () =>
      menuItems
        .map((burger) => ({ burger, amount: selected[burger.name] ?? 0 }))
        .filter((item) => item.amount > 0),
    [selected],
  );

  const totalItems = selectedBurgers.reduce((sum, item) => sum + item.amount, 0);

  const filteredMenuItems = useMemo(
    () => (activeCategory === "Todos" ? menuItems : menuItems.filter((item) => getItemGroup(item) === activeCategory)),
    [activeCategory],
  );

  const orderUrl = useMemo(() => {
    const lines =
      selectedBurgers.length > 0
        ? selectedBurgers.map(({ burger, amount }) => `- ${amount}x ${burger.name} (${burger.price})`)
        : ["Gostaria de conhecer o cardapio de hamburgueres."];
    const message = [
      "Ola, vim pelo site Burger Lab.",
      "Tenho interesse em:",
      ...lines,
      "Pode me apresentar combos e tempo de entrega?",
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [selectedBurgers]);

  const changeAmount = (burger: Burger, delta: number) => {
    setSelected((current) => {
      const nextAmount = Math.max((current[burger.name] ?? 0) + delta, 0);
      const next = { ...current };

      if (nextAmount === 0) {
        delete next[burger.name];
      } else {
        next[burger.name] = nextAmount;
      }

      return next;
    });
  };

  const removeBurger = (burger: Burger) => {
    setSelected((current) => {
      const next = { ...current };
      delete next[burger.name];
      return next;
    });
  };

  return (
    <>
      <main className="min-h-screen bg-[#111111] text-white">
        <section className="relative overflow-hidden bg-[#101010] pb-6 md:min-h-[760px] md:pb-0">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1900&q=88"
            alt="Hamburguer artesanal"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.92)_0%,rgba(17,17,17,0.62)_45%,rgba(17,17,17,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent,rgba(17,17,17,0.96))]" />

          <header className="relative z-10 flex items-center justify-between px-7 py-7 md:px-12">
            <nav className="hidden gap-9 text-sm font-medium text-white/80 md:flex">
              <a href="#home">Inicio</a>
              <a href="#menu">Pedidos</a>
              <a href={orderUrl} target="_blank" rel="noreferrer">
                Contato
              </a>
            </nav>
            <p className="absolute left-1/2 -translate-x-1/2 text-2xl font-black tracking-tight">
              Burger<span className="text-[#82b94e]">Lab</span>
            </p>
            <button type="button" className="ml-auto flex items-center gap-3 text-sm font-semibold" onClick={() => setCartOpen(true)}>
              Carrinho
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#82d23a] px-2 text-xs text-[#111111]">
                {totalItems}
              </span>
            </button>
          </header>

          <div id="home" className="relative z-10 px-7 pb-8 pt-20 md:px-12 md:pt-32">
            <div className="max-w-xl">
              <h1 className="text-5xl font-light leading-[0.98] tracking-wide text-white/82 sm:text-6xl md:text-7xl">
                Hamburguer
                <br />
                Artesanal
                <br />
                da Casa
              </h1>

              <div className="mt-9 max-w-sm rounded-[28px] bg-white/12 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-white">Escolha seu hambúrguer favorito</p>
                <p className="mt-1 text-sm text-white/65">
                  Cardápio com opções artesanais, combos e pedido rápido.
                </p>
                <a
                  href="#menu"
                  className="mt-4 inline-flex rounded-full bg-[#82b94e] px-5 py-3 text-sm font-black text-[#111111]"
                >
                  Ver cardápio
                </a>
              </div>

              <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm text-white/84 backdrop-blur">
                <strong>1M+</strong>
                <span>★★★★★</span>
                <strong>4.8 de avaliacao</strong>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-2 rounded-t-[28px] bg-black/58 px-7 py-6 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => (
                <article key={category.name} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <img src={category.image} alt={category.name} className="h-20 w-20 rounded-full object-cover" />
                  <div>
                    <h2 className="font-semibold">{category.name}</h2>
                    <p className="mt-1 text-xs text-white/70">A partir de R$ 29</p>
                    <button
                      type="button"
                      className={`mt-2 inline-flex rounded px-3 py-1 text-xs font-bold ${
                        activeCategory === category.filter ? "bg-[#82b94e] text-[#111111]" : "bg-white/12 text-white"
                      }`}
                      onClick={() => setActiveCategory(category.filter)}
                    >
                      {activeCategory === category.filter ? "Selecionado" : "Filtrar"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="bg-[#f7f2ec] px-5 py-14 text-[#1b1510] md:px-10 lg:px-16">
          <div className="mb-9 text-center">
            <p className="font-serif text-lg italic text-[#9f351f]">Mais pedidos</p>
            <h2 className="mt-2 font-serif text-4xl">
              {activeCategory === "Todos" ? "Cardápio da casa" : activeCategory}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {filteredMenuItems.map((burger) => {
              const amount = selected[burger.name] ?? 0;

              return (
                <article key={burger.name} className="flex h-full flex-col rounded-lg bg-white p-3 shadow-[0_16px_40px_rgba(27,21,16,0.11)]">
                  <div className="aspect-[4/3] overflow-hidden rounded-md bg-[#1b1510]">
                    <img src={burger.image} alt={burger.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-2 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9f351f]">{burger.category}</p>
                        <h3 className="mt-1 font-bold">{burger.name}</h3>
                      </div>
                      <span className="shrink-0 font-black text-[#9f351f]">{burger.price}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#6b5f55]">{burger.description}</p>
                    <button
                      type="button"
                      className={`mt-5 w-full rounded-lg px-4 py-3 text-sm font-black ${
                        amount > 0 ? "border border-[#9f351f] text-[#9f351f]" : "bg-[#9f351f] text-white"
                      }`}
                      onClick={() => changeAmount(burger, 1)}
                    >
                      {amount > 0 ? `${amount} no carrinho` : "Adicionar"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="combos" className="grid gap-8 bg-white px-5 py-14 text-[#1b1510] md:px-10 lg:grid-cols-[1fr_1.2fr] lg:px-16">
          <div>
            <p className="font-serif text-lg italic text-[#9f351f]">20% off</p>
            <h2 className="mt-2 font-serif text-4xl">Combo da primeira compra</h2>
            <p className="mt-4 max-w-xl leading-7 text-[#6b5f55]">
              Um bloco promocional para destacar campanhas, cupom de abertura ou combos por tempo limitado.
            </p>
            <a href={orderUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-lg bg-[#1b1510] px-6 py-3 text-sm font-black text-white">
              Pedir no WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {menuItems.slice(0, 3).map((burger) => (
              <img key={burger.name} src={burger.image} alt={burger.name} className="h-44 w-full rounded-lg object-cover" />
            ))}
          </div>
        </section>
      </main>

      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#82b94e] text-white shadow-[0_16px_34px_rgba(0,0,0,0.28)]"
        aria-label="Abrir carrinho"
        onClick={() => setCartOpen(true)}
      >
        <CartIcon />
        {totalItems > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#9f351f] px-2 text-xs font-black text-white">
            {totalItems}
          </span>
        ) : null}
      </button>

      <CartDrawer
        isOpen={cartOpen}
        items={selectedBurgers}
        orderUrl={orderUrl}
        onClose={() => setCartOpen(false)}
        onChangeAmount={changeAmount}
        onRemove={removeBurger}
      />
      <Analytics />
    </>
  );
}

export default App;
