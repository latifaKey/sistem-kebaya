import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';
import { INITIAL_EXPENSES } from '../../data/financialData';

export function ExpenseView() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [category, setCategory] = useState('Laundry & Dry Clean');
  const [description, setDescription] = useState('');
  const [relatedKebaya, setRelatedKebaya] = useState('IV001');
  const [amount, setAmount] = useState('75000');

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExp = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      category,
      description,
      relatedKebaya,
      amount: parseInt(amount) || 0
    };

    setExpenses([newExp, ...expenses]);
    setIsModalOpen(false);
    setDescription('');
    setAmount('75000');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Expense Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Total pengeluaran operasional: <strong className="text-rose-700 font-serif text-sm">Rp{totalExpense.toLocaleString('id-ID')}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full btn-glass-primary text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Pengeluaran</span>
        </button>
      </div>

      {/* Table matching frame 199s */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F7] text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-rose-100">
              <tr>
                <th className="py-4 px-4">TANGGAL</th>
                <th className="py-4 px-4">KATEGORI</th>
                <th className="py-4 px-4">DESKRIPSI</th>
                <th className="py-4 px-3">KEBAYA TERKAIT</th>
                <th className="py-4 px-3">NOMINAL</th>
                <th className="py-4 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-600">{exp.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-800">{exp.description}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-stone-700">{exp.relatedKebaya}</td>
                  <td className="py-3.5 px-3 font-bold text-rose-700">
                    Rp{exp.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
              Tambah Pengeluaran Baru
            </h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 block mb-1">Kategori Biaya</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-white"
                >
                  <option value="Laundry & Dry Clean">Laundry & Dry Clean</option>
                  <option value="Perbaikan Payet & Jahit">Perbaikan Payet & Jahit</option>
                  <option value="Packaging & Garment Bag">Packaging & Garment Bag</option>
                  <option value="Operasional Studio">Operasional Studio</option>
                </select>
              </div>

              <div>
                <label className="text-stone-600 block mb-1">Deskripsi Pengeluaran *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dry Clean Kebaya IV001"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1">Kebaya Terkait</label>
                  <input
                    type="text"
                    value={relatedKebaya}
                    onChange={(e) => setRelatedKebaya(e.target.value)}
                    placeholder="IV001"
                    className="w-full p-2.5 rounded-xl border border-stone-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1">Nominal (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#7A1C30] text-white font-bold text-xs uppercase"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-3 rounded-full border border-stone-200 text-stone-600 text-xs"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
