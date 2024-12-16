
export const OrdersSection = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Commandes</h1>
      <div className="bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Numéro</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Statut</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">#12345</td>
              <td className="p-4">15 Dec 2024</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Livré
                </span>
              </td>
              <td className="p-4">129,99 €</td>
              <td className="p-4">
                <button className="text-blue-500 hover:underline">Détails</button>
              </td>
            </tr>
            <tr>
              <td className="p-4">#12346</td>
              <td className="p-4">10 Dec 2024</td>
              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                  En cours
                </span>
              </td>
              <td className="p-4">79,50 €</td>
              <td className="p-4">
                <button className="text-blue-500 hover:underline">Détails</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );