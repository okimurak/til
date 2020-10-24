from optparse import OptionParser
from optparse import OptionGroup


def main():

    usage = """
    %prog [options] arg1 arg2
    """
    parser = OptionParser(usage=usage)

    # String
    parser.add_option("-f", "--file", action="store",
                      type="string", dest="filename", help="FileName")

    # Int
    parser.add_option("-n", "--num", action="store",
                      type="int", dest="num", help="num")
    # Boolean

    parser.add_option("-v", action="store_true",
                      dest="verbose", help="verbose")
    # Const
    parser.add_option("-r", action="store_const",
                      const="root", dest="user_name", help="Use root user")

    parser.add_option("-e", dest="env", help="Environment")

    # Callback
    def is_prod(option, opt_str, value, parser):
        if parser.values.env == "prod":
            raise parser.error("Current environment is production")
        setattr(paser.values, option.dest, True)

    parser.add_option("--release", action="callback",
                      callback=is_prod, dest="release", help="Is release")

    # OptionGroup

    pro_group = OptionGroup(parser, "Pro plan option")
    pro_group.add_option("-p", "--pro", action="store_true",
                         dest="pro", help="`Pro plan option")
    parser.add_option_group(pro_group)

    options, args = parser.parse_args()
    print(options)
    print(args)


if __name__ == "__main__":
    main()
