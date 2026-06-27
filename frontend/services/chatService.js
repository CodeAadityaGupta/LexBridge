import { api } from './api';

export const chatService = {
  async sendMessage(messageText, messageHistory = []) {
    try {
      // Attempt to hit the backend chat endpoint
      return await api.post('/chat/message', {
        message: messageText,
        history: messageHistory,
      });
    } catch (err) {
      if (err.status && err.status < 500) {
        throw err;
      }

      console.warn("Chat API unreachable. Falling back to local keyword response simulation.");
      
      // Simulate network latency (between 1s and 1.8s for natural feeling chat typing)
      const latency = 1000 + Math.random() * 800;
      await new Promise((resolve) => setTimeout(resolve, latency));

      const text = messageText.toLowerCase();

      // Tenancy & Eviction Dispute
      if (
        text.includes('landlord') ||
        text.includes('rent') ||
        text.includes('deposit') ||
        text.includes('evict') ||
        text.includes('eviction') ||
        text.includes('tenant') ||
        text.includes('tenancy') ||
        text.includes('lease') ||
        text.includes('lockout') ||
        text.includes('locked out')
      ) {
        return {
          reply: "Based on what you've described, this looks like a tenancy dispute under the Rent Control Act. Here's what typically matters in cases like this:\n\n1. Proof of tenancy (lease agreement or rent receipts).\n2. Proper notice of eviction (landlords cannot lock you out without legal notice or court order).\n3. Security deposit receipts and transaction history.\n\nI've highlighted Rohan Sharma (Criminal Defence/Disputes) and Priya Menon (Property Disputes) in the sidebar who specialize in tenancy laws. Would you like to review their profiles or consult them?"
        };
      }

      // Labour & Employment
      if (
        text.includes('fired') ||
        text.includes('salary') ||
        text.includes('employer') ||
        text.includes('employee') ||
        text.includes('job') ||
        text.includes('workplace') ||
        text.includes('boss') ||
        text.includes('terminate') ||
        text.includes('terminated') ||
        text.includes('severance') ||
        text.includes('wages')
      ) {
        return {
          reply: "It sounds like you may have an employment or wage dispute under Industrial Disputes regulations. In these matters, crucial factors include:\n\n1. Your employment contract details and appointment letter.\n2. Written records of termination or emails regarding outstanding wages.\n3. Pay slips and bank statements verifying non-payment.\n\nSiddharth Sen (Labour Law) in the sidebar is an expert in employment contracts and employee rights. You might want to view his profile to discuss your options."
        };
      }

      // Property Disputes
      if (
        text.includes('property') ||
        text.includes('land') ||
        text.includes('house') ||
        text.includes('buy') ||
        text.includes('sell') ||
        text.includes('encroach') ||
        text.includes('partition') ||
        text.includes('ownership') ||
        text.includes('deed')
      ) {
        return {
          reply: "This appears to involve a property partition or ownership dispute. Typically, property cases require:\n\n1. Title deeds, mutation documents, and sales contracts.\n2. Current tax receipts and utility bills showing possession.\n3. Survey reports or boundary descriptions if there is encroachment.\n\nPriya Menon (Property Disputes) is our senior advocate in real estate and property litigation. Click on her card in the sidebar to view her profile and check her case record."
        };
      }

      // Family Law & Divorce
      if (
        text.includes('divorce') ||
        text.includes('custody') ||
        text.includes('child') ||
        text.includes('marriage') ||
        text.includes('spouse') ||
        text.includes('husband') ||
        text.includes('wife') ||
        text.includes('alimony') ||
        text.includes('maintenance')
      ) {
        return {
          reply: "This concerns a family law or matrimonial matter. In family disputes, legal proceedings rely heavily on:\n\n1. Marriage certificates and registration documents.\n2. Evidence of financial standing and dependency if alimony is involved.\n3. Details regarding children's current welfare for custody discussions.\n\nAmit Patel in our directory specializes in Family Law and matrimonial resolutions. Consider booking a initial consultation to walk through the legal steps."
        };
      }

      // Criminal Defense & Arrest
      if (
        text.includes('police') ||
        text.includes('arrest') ||
        text.includes('bail') ||
        text.includes('assault') ||
        text.includes('cheat') ||
        text.includes('fraud') ||
        text.includes('theft') ||
        text.includes('accuse') ||
        text.includes('accused') ||
        text.includes('complaint')
      ) {
        return {
          reply: "Based on your description, this is a criminal defense or compliance matter. In such situations, immediate actions include:\n\n1. Obtaining a copy of the First Information Report (FIR).\n2. Applying for anticipatory or regular bail if an arrest is imminent.\n3. Keeping logs of all police communications.\n\nRohan Sharma in the sidebar has 12 years of experience in Criminal Defence and securing High Court bails. You can view his notable cases list directly on his profile."
        };
      }

      // Default Response
      return {
        reply: "Thank you for sharing that. To give you the best assessment, could you clarify:\n\n1. What written agreements or documentation exist?\n2. Did any police or government authorities get involved?\n3. What is the main outcome or compensation you are hoping to achieve?\n\nYou can browse our directory of verified advocates in the sidebar on the right to match against your specific topic area."
      };
    }
  }
};
