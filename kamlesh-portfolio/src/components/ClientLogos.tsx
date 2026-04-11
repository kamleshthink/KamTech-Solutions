import React from 'react';
import { motion } from 'framer-motion';
import { BuildingOfficeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { getFeaturedClients } from '../data/clients';

const ClientLogos: React.FC = () => {
  const clients = getFeaturedClients();
  const projectClients = clients.filter(c => 
    ['Community Platform', 'Digital Agency', 'IT Consulting', 'AgriTech', 'Construction Engineering', 'Professional Community'].includes(c.category)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const LogoCard = ({ client, index }: { client: any; index: number }) => (
    <motion.div
      key={client.id}
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col items-center justify-center min-h-[200px]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/10 group-hover:to-purple-500/5 transition-all duration-300"></div>
        
        {/* Featured badge */}
        {client.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
              <SparklesIcon className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Logo Placeholder - Since logos might not all exist, show elegant placeholder */}
        <div className="relative z-10 w-full h-24 flex items-center justify-center mb-4">
          {client.logo && client.logo !== '/Assets/logo/' ? (
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-20 max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg">
              {client.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="text-center z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-lg">
              {client.name}
            </h3>
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
              {client.category}
            </p>
          </div>
          
          {client.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              {client.description}
            </p>
          )}
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-0 group-hover:opacity-100 rounded-b-2xl transition-all duration-300"></div>
      </div>
    </motion.div>
  );

  return (
    <section id="clients" className="section-padding paper-texture-light relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
           style={{ backgroundImage: "url('/Assets/pragyatek ui/25001136_7045130.jpg')" }}>
      </div>
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BuildingOfficeIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              Trusted Partners
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Worked with <span className="gradient-text">50+ Clients</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From startups to enterprises, we've delivered excellence across diverse industries. 
            Our client portfolio showcases proven success in digital transformation and growth.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: 'Clients Served', value: '50+' },
            { label: 'Projects Delivered', value: '200+' },
            { label: 'Success Rate', value: '98%' },
            { label: 'Avg. Rating', value: '4.9★' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></span>
            Featured Client Projects
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectClients.map((client, idx) => (
              <LogoCard key={client.id} client={client} index={idx} />
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonial Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 md:p-12 rounded-2xl border border-purple-200 dark:border-purple-800 text-center"
        >
          <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 leading-relaxed">
            "We believe in building long-term relationships with our clients. Our success is measured by their success."
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            — Kamlesh Sharma, Founder & CTO
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
