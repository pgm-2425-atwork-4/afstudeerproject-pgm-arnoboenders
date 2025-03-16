"use client";
import { useState } from "react";
import { useOrders } from "@/components/context/OrderProvider";
import { MenuItem, Size, Pasta } from "@/modules/menu/types";
import { Plus } from "lucide-react";

export default function AddButton({ menuItem }: { menuItem: MenuItem }) {
  const { addOrder } = useOrders();
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Normaal");
  const [selectedPasta, setSelectedPasta] = useState("Spaghetti");
  const [adjustedPrice, setAdjustedPrice] = useState(menuItem.price);

  const handleSizeChange = (size: Size) => {
    let newPrice = menuItem.price;
    if (size.name === "Kinder") newPrice -= 1;
    if (size.name === "Maxi") newPrice += 1;

    setSelectedSize(size.name);
    setAdjustedPrice(newPrice);
  };

  const handleAddItem = () => {
    if (menuItem.name.toLowerCase().includes("spaghetti")) {
      setShowOverlay(true);
    } else {
      addOrder([{ ...menuItem, amount: 1 }]);
    }
  };

  const handleConfirm = () => {
    const sizeText = selectedSize === "Normaal" ? "" : selectedSize;
    const pastaText = selectedPasta === "Spaghetti" ? "" : selectedPasta;
    const customizedName = `${menuItem.name} ${sizeText} ${pastaText}`.trim();

    addOrder([
      {
        ...menuItem,
        name: customizedName,
        amount: 1,
        size: selectedSize,
        pasta: selectedPasta,
        price: adjustedPrice,
      },
    ]);

    setShowOverlay(false);
  };
  return (
    <>
      <button
        className="border border-primary p-1 rounded-lg text-primary hover:text-white hover:bg-primary"
        onClick={() => handleAddItem()}
      >
        <Plus />
      </button>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Kies de spaghetti</h2>

            {/* Size Selection */}
            <label className="block mb-2">Grootte</label>
            <div className="mb-4">
              {Array.isArray(menuItem.size) &&
                (menuItem.size as Size[]).map((size) => (
                  <label
                    key={size.name}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.name}
                      checked={selectedSize === size.name}
                      onChange={() => handleSizeChange(size)}
                      className="mr-2"
                    />
                    {size.name}{" "}
                    {size.priceChange !== undefined && (
                      <span className="text-gray-500 ml-2">
                        € {size.priceChange}
                      </span>
                    )}
                  </label>
                ))}
            </div>

            {/* Pasta Type Selection */}
            <label className="block mb-2">Type pasta</label>
            <div className="mb-4">
              {Array.isArray(menuItem.pasta) &&
                (menuItem.pasta as Pasta[]).map((pasta) => (
                  <label key={String(pasta)} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="pasta"
                      value={String(pasta)}
                      checked={selectedPasta === String(pasta)}
                      onChange={(e) => setSelectedPasta(e.target.value)}
                      className="mr-2"
                    />
                    {String(pasta)}
                  </label>
                ))}
            </div>

            {/* Display Adjusted Price */}
            <p className="text-lg font-bold mb-4">
              Prijs:{" "}
              <span className="text-primary">{adjustedPrice.toFixed(2)}€</span>
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowOverlay(false)}
              >
                Annuleer
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleConfirm}
              >
                Voeg toe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
