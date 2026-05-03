import React from 'react';
import { cn } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg overflow-hidden border bg-white border-slate-200 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 transition-colors rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-8 text-slate-600">
              {children}
            </div>
            {footer && (
              <div className="flex justify-end gap-3 p-4 border-t border-slate-100 bg-slate-50/50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
