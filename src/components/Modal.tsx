import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-[var(--color-cream)] rounded-[var(--radius-xl)] shadow-2xl overflow-hidden border-2 border-[var(--color-red-light)]"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-[var(--color-pink)]">
                            <h2 className="text-2xl font-heading text-[var(--color-red)]">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[var(--color-pink)]/20 rounded-full transition-colors text-[var(--color-red)]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
