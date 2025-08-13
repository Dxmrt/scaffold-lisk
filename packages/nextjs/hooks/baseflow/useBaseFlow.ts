import { useState, useCallback } from 'react';
import { parseUnits, formatUnits } from 'viem';
import { useContractWrite, useContractRead } from 'wagmi';
import { BaseFlowCore } from '../../typechain-types';

export function useBaseFlow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { write: createInvoice } = useContractWrite({
    address: process.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: BaseFlowCore.abi,
    functionName: 'createInvoice',
  });

  const { write: updateInventory } = useContractWrite({
    address: process.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    abi: BaseFlowCore.abi,
    functionName: 'updateInventory',
  });

  const handleCreateInvoice = useCallback(async (
    customer: string,
    amount: string,
    dueDate: number,
    metadata: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      // Parse amount as USDC (6 decimals) instead of ETH (18 decimals)
      await createInvoice({
        args: [customer, parseUnits(amount, 6), BigInt(dueDate), metadata],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create invoice');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [createInvoice]);

  const handleUpdateInventory = useCallback(async (
    itemId: string,
    quantity: number,
    price: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      await updateInventory({
        args: [itemId, BigInt(quantity), parseUnits(price, 6)],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inventory');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [updateInventory]);

  return {
    createInvoice: handleCreateInvoice,
    updateInventory: handleUpdateInventory,
    loading,
    error
  };
}
