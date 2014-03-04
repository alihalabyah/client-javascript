============
Introduction
============

This is Qmonix client implementation in JavaScript.
Qmonix is highly customizable, easy to use multi-platform analytics system.

See: http://docs.qmonix.com/latest/.


Build prerequisites
===================

* Google closure compiler
  (http://dl.google.com/closure-compiler/compiler-latest.zip)
* JRE 7 (Java Runtime Environment).


.. note::

        The latest Google compiler only works with JRE 7, if you have the
        older compiler it might also work with JRE 6 or older versions.


Setup build environment
=======================

Get Google closure compiler. Unzip the package and move compiler.jar to
./lib dir. E.g. on Linux systems:

.. code-block:: bash

        $ cd /tmp
        $ wget http://dl.google.com/closure-compiler/compiler-latest.zip
        $ unzip -e compiler-latest.zip -d closure-compiler
        $ cp /tmp/closure-compiler/compiler.jar $(THIS_DIR)/lib

**$(THIS_DIR)** is the directory where this README is located.


.. rubric:: References

.. [#f1] API documentation: http://docs.qmonix.com/latest/javascript/namespaces.html
.. [#f2] Qmonix user guide: http://docs.qmonix.com/latest/
